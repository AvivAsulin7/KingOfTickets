from django.contrib import admin

from .models import Event, Ticket, Deal
from server.models import Account
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

class AccountInline(admin.StackedInline):
    model = Account
    can_delete = False
    verbose_name_plural = "Accounts"

class CustomUser (UserAdmin):
    inlines = (AccountInline, )

admin.site.unregister(User)
admin.site.register(User, CustomUser)

admin.site.register(Event)
admin.site.register(Ticket)
admin.site.register(Deal)

