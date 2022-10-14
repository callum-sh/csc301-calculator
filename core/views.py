from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ItemSerializer
from .models import Items
import datetime

def front(request):
    context = {}

    return render(request, "index.html", context)

@api_view(['GET', 'POST'])
def example(request):

    if request.method == 'GET':
        ret = "Hello Joshua, how are you?"
        return Response({"data": ret, 'time': datetime.now()})
    
    elif request.method == 'POST':
        print(f"POST request data: {request.data}.")
        return Response(status=status.HTTP_200_OK, data={"data": f"received: {request.data}", "time": datetime.now()})


@api_view(['GET', 'POST'])
def item(request):

    if request.method == 'GET':
        item = Items.objects.all()
        serializer = ItemSerializer(item, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def item_detail(request, pk):
    try:
        item = Items.objects.get(pk=pk)
    except Items.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)