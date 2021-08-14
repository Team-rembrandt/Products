CREATE TABLE public.features
(
    id bigint NOT NULL DEFAULT nextval('features_id_seq'::regclass),
    product_id integer NOT NULL,
    feature character varying COLLATE pg_catalog."default" NOT NULL,
    value character varying COLLATE pg_catalog."default",
    CONSTRAINT features_pkey PRIMARY KEY (id),
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.features
    OWNER to postgres;

CREATE INDEX fki_product_id
    ON public.features USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;