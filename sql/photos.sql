CREATE TABLE public.photos
(
    id bigint NOT NULL DEFAULT nextval('photos_id_seq'::regclass),
    style_id integer NOT NULL,
    url character varying COLLATE pg_catalog."default" NOT NULL,
    thumbnail_id character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT photos_pkey PRIMARY KEY (id),
    CONSTRAINT style_id FOREIGN KEY (style_id)
        REFERENCES public.styles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.photos
    OWNER to postgres;