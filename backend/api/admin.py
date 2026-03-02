from django.contrib import admin
from .models import User, Artist, Album, Track, Playlist
# Register your models here.
admin.site.register(User)
admin.site.register(Artist)
admin.site.register(Album)
admin.site.register(Track)
admin.site.register(Playlist)
