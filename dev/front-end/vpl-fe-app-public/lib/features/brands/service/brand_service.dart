import 'package:dio/dio.dart';
import 'package:vpl/environment.dart';
import 'package:vpl/features/brands/models/brand.dart';

class BrandService {
  static BrandService? _instance;

  static BrandService get instance {
    return _instance ??= BrandService();
  }

  Future<List<Brand>?> list() async {
    var dio = Dio();

    final response = await dio.get(
      '${Environment.apiUrl}/vehicles/brands',
    );

    List<Brand> brands = [];

    if (response.statusCode == 200) {
      for (var item in response.data) {
        brands.add(Brand.fromJson(item));
      }

      return brands;
    } else {
      return null;
    }
  }
}
