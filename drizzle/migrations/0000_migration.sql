CREATE TABLE public.demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  work_email text NOT NULL,
  mobile text,
  role text NOT NULL,
  dealership text NOT NULL,
  rooftops text NOT NULL,
  dms text,
  interest text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  work_email text NOT NULL,
  organisation text,
  enquiry_type text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.demo_requests TO service_role;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;