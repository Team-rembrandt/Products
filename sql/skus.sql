CREATE TABLE public.skus
(
    id bigint NOT NULL DEFAULT nextval('skus_id_seq'::regclass),
    style_id integer NOT NULL,
    size character varying COLLATE pg_catalog."default" NOT NULL,
    quantity character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT skus_pkey PRIMARY KEY (id),
    CONSTRAINT style_id FOREIGN KEY (style_id)
        REFERENCES public.styles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.skus
    OWNER to postgres;

CREATE INDEX fki_style_id
    ON public.skus USING btree
    (style_id ASC NULLS LAST)
    TABLESPACE pg_default;