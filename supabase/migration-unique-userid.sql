-- Migración: agregar constraint UNIQUE en brand_kits.user_id
-- Correr si ya creaste la tabla brand_kits sin esta constraint.
alter table brand_kits add constraint brand_kits_user_id_unique unique (user_id);
