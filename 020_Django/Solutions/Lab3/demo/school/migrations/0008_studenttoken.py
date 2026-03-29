from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('school', '0007_remove_studentcourse_grade'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=512, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('student', models.OneToOneField(on_delete=models.deletion.CASCADE, related_name='session_token', to='school.student')),
            ],
        ),
    ]
