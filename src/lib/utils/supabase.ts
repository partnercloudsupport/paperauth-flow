import { createClient } from '@supabase/auth-helpers-sveltekit';

export const supabaseClient = createClient(
	'https://avcxpevqalkcdmuxqkrd.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2Y3hwZXZxYWxrY2RtdXhxa3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyOTc5NDcsImV4cCI6MTk4Mzg3Mzk0N30.p3QouFnse2agmZHSOj-Y8Xfnq_qiA32bKL7vey7vogc'
);
