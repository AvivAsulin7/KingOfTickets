from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from server import views
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/auth/', include('djoser.urls')),
    path(f"api/auth/", include('djoser.urls.jwt')),
    path('api/signIn', views.sign_in),
    path('api/signUp', views.sign_up),
    path('api/getUser/<int:id>', views.getUserById),
    path('api/getEvents/<str:category>', views.getEventsByCategory),
    path('api/UpcomingEvents', views.getUpcomingEvents),
    path('api/getEventsInfo', views.getEventsInfo),
    path('api/search', views.searchEvents),
    path('api/uploadTickets', views.uploadTickets),
    path('api/getEvent/<int:eid>', views.getEventById),
    path('api/getTicket/<int:eid>', views.getTicketByEventId),
    path('api/buyTickets/<int:tid>/<int:id>', views.buyTicket),
    path('api/getTickets/<int:uid>/<str:state>', views.getTickets),
    path('api/updateStatusLocation', views.updateStatusLocationDeal),
    path('extract-pdf-text/', views.extract_pdf_text, name='extract_pdf_text'),
    path('api/checkFieldsTickets', views.checkValidityTicket),


]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
