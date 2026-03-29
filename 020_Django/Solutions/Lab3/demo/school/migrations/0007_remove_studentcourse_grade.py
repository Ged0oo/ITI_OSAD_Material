from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('school', '0006_merge_20260329_1125'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentcourse',
            name='grade',
        ),
    ]
