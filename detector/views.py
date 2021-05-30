from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import os
from django.core.files.storage import default_storage
from .detector import detect


@csrf_exempt
def detect_empty_space(request):
    input_image = request.FILES['image']
    uploaded_filename = request.FILES['image'].name
    file_name = default_storage.save(input_image.name, input_image)
    template_file = settings.BASE_DIR / 'detector' / 'static' / 'imagedetection' / 'Template.png'
    out_filename = 'output'+uploaded_filename
    output_path = default_storage.path(out_filename)
    n = detect(str(default_storage.path(file_name)), str(template_file), str(output_path))
    url = default_storage.url(out_filename)
    return JsonResponse({'url': 'http://localhost:8000' + url, 'count': n}, status=200)

def detection_page(request):
    return render(request, 'detect.html', {})