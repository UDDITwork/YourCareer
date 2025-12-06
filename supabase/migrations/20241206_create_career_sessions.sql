-- Create career_sessions table for storing career counselling sessions
CREATE TABLE IF NOT EXISTS career_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Career Counselling Session',
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  collected_data JSONB DEFAULT NULL,
  report JSONB DEFAULT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_career_sessions_user_id ON career_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_career_sessions_status ON career_sessions(status);
CREATE INDEX IF NOT EXISTS idx_career_sessions_created_at ON career_sessions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE career_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own sessions
CREATE POLICY "Users can view own career sessions"
  ON career_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own sessions
CREATE POLICY "Users can create own career sessions"
  ON career_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own sessions
CREATE POLICY "Users can update own career sessions"
  ON career_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own sessions
CREATE POLICY "Users can delete own career sessions"
  ON career_sessions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_career_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS trigger_career_sessions_updated_at ON career_sessions;
CREATE TRIGGER trigger_career_sessions_updated_at
  BEFORE UPDATE ON career_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_career_sessions_updated_at();
