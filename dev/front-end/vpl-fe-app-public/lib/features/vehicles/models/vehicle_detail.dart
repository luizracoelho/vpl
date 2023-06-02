import 'package:vpl/features/evaluations/models/evaluation.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';

class VehicleDetail {
  late Vehicle vehicle;
  List<Evaluation>? evaluationsFipe;
  List<Evaluation>? evaluationsMolicar;

  VehicleDetail.fromJson(Map<String, dynamic> json) {
    vehicle = Vehicle.fromJson(json['vehicle']);

    if (json['evaluationsFipe'] != null) {
      evaluationsFipe = [];

      for (var evaluation in json['evaluationsFipe']) {
        evaluationsFipe!.add(Evaluation.fromJson(evaluation));
      }
    }

    if (json['evaluationsMolicar'] != null) {
      evaluationsMolicar = [];

      for (var evaluation in json['evaluationsMolicar']) {
        evaluationsMolicar!.add(Evaluation.fromJson(evaluation));
      }
    }
  }
}
