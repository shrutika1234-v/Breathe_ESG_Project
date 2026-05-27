import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import EmissionRecord


@api_view(['POST'])
def upload_csv(request):

    file = request.FILES['file']

    source_type = request.data.get('source_type')

    df = pd.read_csv(file)

    for _, row in df.iterrows():

        suspicious = False

        if float(row['quantity']) > 100000:
            suspicious = True

        EmissionRecord.objects.create(
            source_type=source_type,
            category=row['category'],
            quantity=row['quantity'],
            unit=row['unit'],
            suspicious=suspicious
        )

    return Response({"message": "Uploaded successfully"})

from rest_framework.serializers import ModelSerializer


class EmissionSerializer(ModelSerializer):

    class Meta:
        model = EmissionRecord
        fields = '__all__'


@api_view(['GET'])
def records(request):

    data = EmissionRecord.objects.all()

    serializer = EmissionSerializer(data, many=True)

    return Response(serializer.data)