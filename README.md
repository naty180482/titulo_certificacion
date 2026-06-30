# 🛒 Administración de Productos - E-commerce

## Motor de base de datos
SQLite (db.sqlite3)

## Descripción del modelo de datos

### Categoría
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | AutoField | Clave primaria |
| nombre | CharField(100) | Nombre de la categoría |
| descripcion | TextField | Descripción opcional |

### Producto
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | AutoField | Clave primaria |
| nombre | CharField(200) | Nombre del producto |
| descripcion | TextField | Descripción |
| precio | DecimalField(10,2) | Precio (>0) |
| stock | IntegerField | Stock (>=0) |
| categoria | ForeignKey | Relación con Categoría |
| disponible | BooleanField | ¿Disponible? |
| fecha_creacion | DateTimeField | Fecha de creación |
| fecha_actualizacion | DateTimeField | Última modificación |

**Relación:** Una Categoría tiene muchos Productos

## Rutas principales

| URL | Descripción |
|-----|-------------|
| `/` | Listar productos |
| `/crear/` | Crear producto |
| `/editar/<id>/` | Editar producto |
| `/eliminar/<id>/` | Eliminar producto |
| `/admin/` | Panel de administración |

## Pasos para ejecutar

```bash
# Activar entorno virtual
venv\Scripts\activate

# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver