from django.apps import AppConfig

class ProductosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'productos'
    
    def ready(self):
        from .models import crear_categorias_default
        crear_categorias_default()