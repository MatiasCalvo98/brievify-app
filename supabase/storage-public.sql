-- Hacer público el bucket brand-assets para que los logos se vean en el preview.
-- Correr en Supabase → SQL Editor si ya creaste el bucket como privado.
update storage.buckets set public = true where id = 'brand-assets';

-- Política de lectura pública
drop policy if exists "public read brand-assets" on storage.objects;
create policy "public read brand-assets"
  on storage.objects for select
  using (bucket_id = 'brand-assets');
