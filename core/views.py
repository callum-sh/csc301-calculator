from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ItemSerializer, DiscountSerializer
from .models import Items, Discounts
import datetime

RESET = True
TAX_RATE = 0.13

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

    sum = request.session.get('sum')
    if sum is None or RESET:
        sum = 0
        request.session['sum'] = sum

    if request.method == 'GET':
        item = Items.objects.all()
        serializer = ItemSerializer(item, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(float(serializer.data["price"]))
            sum += float(serializer.data["price"])
            request.session['sum'] = sum
            print(f"the new sum is {sum}")
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def discount(request):
    disc = request.session.get('disc')
    if disc is None or RESET:
        disc = 0
        request.session['disc'] = disc

    if request.method == 'GET':
        discount = Discounts.objects.all()
        serializer = DiscountSerializer(discount, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DiscountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            disc += float(serializer.data["percentage"])
            request.session['disc'] = disc
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def item_detail(request, pk):
    try:
        item = Items.objects.get(pk=pk)
    except Items.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        sum = request.session.get('sum')
        if sum is None:
            sum = 0

        
        sum -= float(item.price)
        request.session['sum'] = sum
        item.delete()
        print(f"the new sum is {sum}")
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def discount_detail(request, pk):
    try:
        discount = Discounts.objects.get(pk=pk)
    except Discounts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        disc = request.session.get('disc')
        if disc is None:
            disc = 0
        disc -= (float(discount.percentage))
        request.session['disc'] = disc
        discount.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def sum(request):
    print("called")
    sum = request.session.get('sum')
    if sum is None or RESET:
        sum = 0
    disc = request.session.get('disc')
    if disc is None or RESET:
        disc = 0

    if request.method == 'GET':
        print(f"sending {sum}, discount {disc}")
        return Response({"sum": round(float(sum), 2), "tax": round(sum * TAX_RATE, 2), "total": round(sum * (1 + TAX_RATE) * (1 - (0.01 * disc)), 2)})
