'use server'

import { createClient } from "@/utils/supabase/server";
import { CareerSession, CareerSessionMessage, CareerSessionSummary, CareerReport } from "@/lib/types";
import { revalidatePath } from 'next/cache';

/**
 * Get all career sessions for the current user
 */
export async function getCareerSessions(): Promise<CareerSessionSummary[]> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error: fetchError } = await supabase
    .from('career_sessions')
    .select('id, user_id, title, status, report, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (fetchError) {
    console.error('Error fetching career sessions:', fetchError);
    throw new Error('Failed to fetch career sessions');
  }

  return (data || []).map(session => ({
    id: session.id,
    user_id: session.user_id,
    title: session.title,
    status: session.status,
    has_report: !!session.report,
    created_at: session.created_at,
    updated_at: session.updated_at,
  }));
}

/**
 * Get a single career session by ID
 */
export async function getCareerSessionById(sessionId: string): Promise<CareerSession> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error: fetchError } = await supabase
    .from('career_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .single();

  if (fetchError || !data) {
    console.error('Error fetching career session:', fetchError);
    throw new Error('Career session not found');
  }

  return data as CareerSession;
}

/**
 * Create a new career session
 */
export async function createCareerSession(title?: string): Promise<CareerSession> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  const sessionData = {
    user_id: user.id,
    title: title || `Career Session - ${new Date().toLocaleDateString()}`,
    messages: [],
    status: 'in_progress',
  };

  const { data, error: insertError } = await supabase
    .from('career_sessions')
    .insert(sessionData)
    .select()
    .single();

  if (insertError || !data) {
    console.error('Error creating career session:', insertError);
    throw new Error('Failed to create career session');
  }

  revalidatePath('/check');
  revalidatePath('/home');

  return data as CareerSession;
}

/**
 * Update a career session's messages
 */
export async function updateCareerSessionMessages(
  sessionId: string,
  messages: CareerSessionMessage[]
): Promise<CareerSession> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error: updateError } = await supabase
    .from('career_sessions')
    .update({ messages })
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (updateError || !data) {
    console.error('Error updating career session:', updateError);
    throw new Error('Failed to update career session');
  }

  return data as CareerSession;
}

/**
 * Update a career session's title
 */
export async function updateCareerSessionTitle(
  sessionId: string,
  title: string
): Promise<CareerSession> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error: updateError } = await supabase
    .from('career_sessions')
    .update({ title })
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (updateError || !data) {
    console.error('Error updating career session title:', updateError);
    throw new Error('Failed to update career session title');
  }

  revalidatePath('/check');
  revalidatePath('/home');

  return data as CareerSession;
}

/**
 * Save the generated career report
 */
export async function saveCareerReport(
  sessionId: string,
  report: CareerReport
): Promise<CareerSession> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error: updateError } = await supabase
    .from('career_sessions')
    .update({
      report,
      status: 'completed'
    })
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (updateError || !data) {
    console.error('Error saving career report:', updateError);
    throw new Error('Failed to save career report');
  }

  revalidatePath('/check');
  revalidatePath('/home');

  return data as CareerSession;
}

/**
 * Delete a career session
 */
export async function deleteCareerSession(sessionId: string): Promise<void> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  const { error: deleteError } = await supabase
    .from('career_sessions')
    .delete()
    .eq('id', sessionId)
    .eq('user_id', user.id);

  if (deleteError) {
    console.error('Error deleting career session:', deleteError);
    throw new Error('Failed to delete career session');
  }

  revalidatePath('/check');
  revalidatePath('/home');
}

/**
 * Get user's career session count
 */
export async function getCareerSessionCount(): Promise<number> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return 0;
  }

  const { count, error: countError } = await supabase
    .from('career_sessions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (countError) {
    console.error('Error counting career sessions:', countError);
    return 0;
  }

  return count || 0;
}
