import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { LanguageModelV1 } from 'ai';
import { 
  getModelById, 
  getModelProvider,
  type AIConfig
} from '@/lib/ai-models';

// Re-export types for backward compatibility
export type { ApiKey, AIConfig } from '@/lib/ai-models';

/**
 * Initializes an AI client based on the provided configuration
 * Falls back to default OpenAI configuration if no config is provided
 */
export function initializeAIClient(config?: AIConfig, isPro?: boolean, useThinking?: boolean) {
  void useThinking; // Keep for future use

  // Handle Pro subscription with environment variables
  if (isPro && config) {
    const { model } = config;
    const modelData = getModelById(model);
    const resolvedModelId = modelData?.id ?? model;
    const provider = modelData ? getModelProvider(resolvedModelId) : undefined;
    
    if (!modelData || !provider) {
      throw new Error(`Unknown model: ${model}`);
    }

    // Get the environment key and check if it exists
    const envKey = process.env[provider.envKey];
    if (!envKey) {
      throw new Error(`${provider.name} API key not found (${provider.envKey})`);
    }

    // Create the appropriate SDK client based on provider
    switch (provider.id) {
      case 'anthropic':
        return createAnthropic({ apiKey: envKey })(resolvedModelId) as LanguageModelV1;
      
      case 'openai':
        // Check if this is actually an OpenRouter model (contains forward slash)
        if (resolvedModelId.includes('/')) {
          // Use OpenRouter for models with provider prefix
          const openRouterKey = process.env.OPENROUTER_API_KEY;
          if (!openRouterKey) {
            throw new Error('OpenRouter API key not found (OPENROUTER_API_KEY)');
          }
          return createOpenRouter({
            apiKey: openRouterKey,
            baseURL: 'https://openrouter.ai/api/v1',
            headers: {
              'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              'X-Title': 'ResumeLM'
            },
            
          })(resolvedModelId) as LanguageModelV1;
        }
        // Regular OpenAI models
        return createOpenAI({ 
          apiKey: envKey,
          compatibility: 'strict'
        })(resolvedModelId) as LanguageModelV1;
      
      case 'openrouter':
        return createOpenRouter({
          apiKey: envKey,
          baseURL: 'https://openrouter.ai/api/v1',
          headers: {
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            'X-Title': 'ResumeLM'
          }
        })(resolvedModelId) as LanguageModelV1;
      
      default:
        throw new Error(`Unsupported provider: ${provider.id}`);
    }
  }

  // Existing logic for free users - use default free model with server-side keys
  if (!config) {
    // Default to the free model using server-side API keys
    const defaultModel = 'gpt-4o-mini';

    // Try OpenAI first
    const openAIKey = process.env.OPENAI_API_KEY;
    if (openAIKey) {
      return createOpenAI({
        apiKey: openAIKey,
        compatibility: 'strict'
      })(defaultModel) as LanguageModelV1;
    }

    // Fallback to Anthropic if OpenAI key is not available
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey) {
      return createAnthropic({ apiKey: anthropicKey })('claude-haiku-4-5-20251001') as LanguageModelV1;
    }

    // No API keys available
    throw new Error('No API key available. Please configure OPENAI_API_KEY or ANTHROPIC_API_KEY in environment variables.');
  }

  const { model, apiKeys } = config;
  const modelData = getModelById(model);
  const resolvedModelId = modelData?.id ?? model;
  const provider = modelData ? getModelProvider(resolvedModelId) : undefined;
  
  if (!modelData || !provider) {
    throw new Error(`Unknown model: ${model}`);
  }
  
  // Special case: free-tier models (e.g., GPT-4o Mini) skip user key requirement
  // Also allow GPT OSS models to use server-side OpenRouter key
  if (modelData.features.isFree || resolvedModelId.includes('/')) {
    // For OpenRouter models (with slash), use OpenRouter key
    if (resolvedModelId.includes('/')) {
      const openRouterKey = process.env.OPENROUTER_API_KEY;
      if (!openRouterKey) throw new Error('OpenRouter API key not found');

      return createOpenRouter({
        apiKey: openRouterKey,
        baseURL: 'https://openrouter.ai/api/v1',
        headers: {
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          'X-Title': 'ResumeLM'
        }
      })(resolvedModelId) as LanguageModelV1;
    }

    // For regular free models like GPT-4o Mini - use server-side API key with fallback
    const envKey = process.env[provider.envKey];

    if (provider.id === 'openai') {
      if (envKey) {
        return createOpenAI({
          apiKey: envKey,
          compatibility: 'strict',
        })(resolvedModelId) as LanguageModelV1;
      }

      // Fallback to Anthropic if OpenAI key is missing
      const anthropicKey = process.env.ANTHROPIC_API_KEY;
      if (anthropicKey) {
        console.log('[AI Tools] OpenAI key not found, falling back to Anthropic');
        return createAnthropic({ apiKey: anthropicKey })('claude-haiku-4-5-20251001') as LanguageModelV1;
      }

      throw new Error('No API key available. Please configure OPENAI_API_KEY or ANTHROPIC_API_KEY in environment variables.');
    }

    // For Anthropic models
    if (provider.id === 'anthropic') {
      if (envKey) {
        return createAnthropic({ apiKey: envKey })(resolvedModelId) as LanguageModelV1;
      }

      // Fallback to OpenAI if Anthropic key is missing
      const openAIKey = process.env.OPENAI_API_KEY;
      if (openAIKey) {
        console.log('[AI Tools] Anthropic key not found, falling back to OpenAI');
        return createOpenAI({
          apiKey: openAIKey,
          compatibility: 'strict',
        })('gpt-4o-mini') as LanguageModelV1;
      }

      throw new Error('No API key available. Please configure OPENAI_API_KEY or ANTHROPIC_API_KEY in environment variables.');
    }
  }
  
  // For non-free models, user must provide their own API key
  const userApiKey = apiKeys.find(k => k.service === provider.id)?.key;
  if (!userApiKey) {
    throw new Error(`${provider.name} API key not found in user configuration`);
  }

  // Create the appropriate SDK client based on provider
  switch (provider.id) {
    case 'anthropic':
      return createAnthropic({ apiKey: userApiKey })(resolvedModelId) as LanguageModelV1;
    
    case 'openai':
      // Check if this is actually an OpenRouter model (contains forward slash)
      if (resolvedModelId.includes('/')) {
        // Use OpenRouter for models with provider prefix
        const openRouterKey = apiKeys.find(k => k.service === 'openrouter')?.key;
        if (!openRouterKey) {
          throw new Error('OpenRouter API key not found in user configuration');
        }
        return createOpenRouter({
          apiKey: openRouterKey,
          baseURL: 'https://openrouter.ai/api/v1',
          headers: {
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            'X-Title': 'ResumeLM'
          }
        })(resolvedModelId) as LanguageModelV1;
      }
      // Regular OpenAI models
      return createOpenAI({ 
        apiKey: userApiKey,
        compatibility: 'strict'
      })(resolvedModelId) as LanguageModelV1;
    
    case 'openrouter':
      return createOpenRouter({
        apiKey: userApiKey,
        baseURL: 'https://openrouter.ai/api/v1',
        headers: {
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          'X-Title': 'ResumeLM'
        }
      })(resolvedModelId) as LanguageModelV1;
    
    default:
      throw new Error(`Unsupported provider: ${provider.id}`);
  }
}
