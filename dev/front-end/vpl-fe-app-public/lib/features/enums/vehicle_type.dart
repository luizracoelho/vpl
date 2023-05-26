import 'package:json_annotation/json_annotation.dart';

enum VehicleType {
  @JsonValue(1)
  Car(1),
  @JsonValue(2)
  Moto(2),
    @JsonValue(3)
  Bus(3),
      @JsonValue(4)
  Truck(4),
      @JsonValue(5)
  Van(5);

  const VehicleType(this.value);
  final num value;
}