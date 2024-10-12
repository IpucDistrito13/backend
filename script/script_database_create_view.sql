-- VISTA DE SLIDERS

CREATE VIEW sliders_view AS
SELECT 
    sliders.id AS id,
    sliders.titulo,
    sliders.estado,
    images.url
FROM 
    sliders
LEFT JOIN 
    images ON images.imageable_id = sliders.id 
        AND images.imageable_type = 'App\\Models\\Slider';

-- VISTA DE COMITES
CREATE VIEW comites_view AS SELECT c.*, 
       img.id AS image_id, 
       img.url AS image_url
FROM comites c
LEFT JOIN images img 
ON img.imageable_id = c.id 
AND img.imageable_type = 'App\\Models\\Comite';

-- VISTA DE CONGREGACIONES
CREATE VIEW congregaciones_view AS
SELECT c.*, 
       m.nombre AS municipio, 
       d.id AS departamento_id, 
       d.nombre AS departamento,
       img.id AS image_id,
       img.url AS fotocongregacion
FROM congregaciones c
JOIN municipios m ON c.municipio_id = m.id
JOIN departamentos d ON m.departamento_id = d.id
LEFT JOIN images img ON img.imageable_id = c.id 
                     AND img.imageable_type = 'App\\Models\\Congregacion'
WHERE c.estado = 'Activo';

-- VISTA DE PODCASTS
CREATE VIEW podcasts_view AS
SELECT 
    podcasts.id AS id,
    podcasts.slug,
    podcasts.titulo,
    podcasts.descripcion,
    podcasts.contenido,
    podcasts.comite_id AS podcast_comite_id, 
    podcasts.categoria_id AS podcast_categoria_id, 
    comites.id AS comite_id,
    comites.nombre AS comite,
    categorias.id AS categoria_id,
    categorias.nombre AS categoria,
    images.url AS image_url
FROM 
    podcasts
INNER JOIN 
    comites ON podcasts.comite_id = comites.id -- Relación con comites
INNER JOIN 
    categorias ON podcasts.categoria_id = categorias.id -- Relación con categorias
LEFT JOIN 
    images ON images.imageable_id = podcasts.id AND images.imageable_type = 'App\\Models\\Podcast';

-- VISTA LIDERES
CREATE VIEW lideres_view AS
SELECT lideres.id as id, lideres.lidertipo_id, lideres.comite_id,
       users.uuid, users.nombre, users.apellidos, users.celular, users.visible_celular,
       images.url AS imagen_url, 
       comites.nombre AS comite_nombre, 
       lider_tipos.nombre AS tipo_nombre
FROM lideres
INNER JOIN users ON users.id = lideres.usuario_id
LEFT JOIN images ON images.imageable_id = users.id 
AND images.imageable_type = 'App\\Models\\User'
INNER JOIN comites ON comites.id = lideres.comite_id
INNER JOIN lider_tipos ON lider_tipos.id = lideres.lidertipo_id;


-- SERIES
CREATE VIEW  series_view AS
SELECT 
    s.*, 
    c.nombre as comite,
    cat.nombre as categoria,
    i.url as image_url
FROM 
    series s
JOIN 
    comites c ON s.comite_id = c.id
JOIN 
    categorias cat ON s.categoria_id = cat.id
LEFT JOIN 
    images i ON i.imageable_id = s.id AND i.imageable_type = 'App\\Models\\Serie';







