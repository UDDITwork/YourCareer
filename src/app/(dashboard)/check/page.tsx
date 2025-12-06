import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getCareerSessions } from "@/utils/actions/career/actions";
import { CareerCounsellorPage } from "@/components/career/career-counsellor-page";
import { CareerSessionSummary } from "@/lib/types";

export default async function CheckPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Check authentication
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  // Get query params
  const params = await searchParams;
  const initialSessionId = params?.session || null;

  // Fetch user's career sessions
  let sessions: CareerSessionSummary[] = [];
  try {
    sessions = await getCareerSessions();
  } catch (e) {
    console.error('Error fetching career sessions:', e);
  }

  return <CareerCounsellorPage initialSessions={sessions} initialSessionId={initialSessionId} />;
}
