# Generated by Django 4.2.4 on 2023-09-26 22:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(default='')),
                ('instructions', models.TextField(default='')),
                ('image', models.ImageField(blank=True, null=True, upload_to='recipes/')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='my_recipes', to=settings.AUTH_USER_MODEL)),
                ('ingredients', models.ManyToManyField(to='recipes.ingredient')),
            ],
        ),
    ]