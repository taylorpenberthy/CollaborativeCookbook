
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from .schema import schema

urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^graphiql', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    re_path(r'^gql', csrf_exempt(GraphQLView.as_view(batch=True))),
    path('api/', include('recipes.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)