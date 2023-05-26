import 'package:dio/dio.dart';
import 'package:vpl/environment.dart';
import 'package:vpl/features/models/models/model.dart';

class ModelService {
  static ModelService? _instance;

  static ModelService get instance {
    return _instance ??= ModelService();
  }

  Future<List<Model>?> list() async {
    var dio = Dio();

    final response = await dio.get(
      '${Environment.apiUrl}/vehicles/models',
    );

    List<Model> models = [];

    if (response.statusCode == 200) {
      for (var item in response.data) {
        models.add(Model.fromJson(item));
      }

      return models;
    } else {
      return null;
    }
  }
}
