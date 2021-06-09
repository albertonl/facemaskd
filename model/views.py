from django.shortcuts import render
from django.http import JsonResponse

import seeed_mlx9064x
import time

CHIP_TYPE = 'MLX90641'

# Create your views here.
def index_view(request):
    return render(request, "model/index.html", {})

def api_thermal_datapoint(request):
    if CHIP_TYPE == 'MLX90641':
        mlx = seeed_mlx9064x.grove_mxl90641()
        frame = [0] * 192
    elif CHIP_TYPE == 'MLX90640':
        mlx = seeed_mlx9064x.grove_mxl90640()
        frame = [0] * 768
    try:
        mlx.getFrame(frame)
    except ValueError:
        print("Error getting thermal frame")

    return JsonResponse({
        "point": max(frame)
    })
