import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import 'package:vpl/features/brands/models/brand.dart';
import 'package:vpl/features/brands/service/brand_service.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';

class BrandsListPage extends StatefulWidget {
  const BrandsListPage({super.key});

  @override
  State<BrandsListPage> createState() => _BrandsListPageState();
}

class _BrandsListPageState extends State<BrandsListPage> {
  List<Brand>? brands;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();

    listBrands();
  }

  Future<void> listBrands() async {
    setState(() {
      isLoading = true;
    });

    brands = await BrandService.instance.list();

    setState(() {
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('VPL Marcas'),
      ),
      drawer: const VplDrawer(),
      body: SafeArea(
        child: isLoading
            ? Padding(
                padding: const EdgeInsets.all(12.0),
                child: SingleChildScrollView(
                  child: SizedBox(
                    width: double.infinity,
                    child: Column(
                      children: [
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                        getLoadingItem(),
                      ],
                    ),
                  ),
                ),
              )
            : brands?.isEmpty ?? true
                ? const Center(
                    child: Text(
                      'Nenhuma marca encontrada',
                    ),
                  )
                : RefreshIndicator(
                    color: Theme.of(context).primaryColor,
                    onRefresh: () async => listBrands(),
                    child: ListView.builder(
                      itemCount: brands?.length ?? 0,
                      itemBuilder: (_, index) {
                        final Brand brand = brands![index];
                        return Column(
                          children: [
                            ListTile(
                              leading: CircleAvatar(backgroundImage: NetworkImage(brand.logo)),
                              title: Text(brand.name),
                              trailing: const Icon(Icons.chevron_right),
                              onTap: () {
                                Navigator.of(context).pushNamed(
                                  '/brands/models',
                                  arguments: brand.id,
                                );
                              },
                            ),
                            const Divider(),
                          ],
                        );
                      },
                    ),
                  ),
      ),
    );
  }

  Widget getLoadingItem() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Shimmer.fromColors(
                    baseColor: Colors.grey.shade400,
                    highlightColor: Colors.grey.shade300,
                    child: Container(
                      height: 40,
                      width: 40,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade400,
                        borderRadius: BorderRadius.circular(
                          20,
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 8.0),
                    child: Shimmer.fromColors(
                      baseColor: Colors.grey.shade400,
                      highlightColor: Colors.grey.shade300,
                      child: Container(
                        height: 15,
                        width: 100,
                        color: Colors.grey.shade400,
                      ),
                    ),
                  ),
                ],
              ),
              Shimmer.fromColors(
                baseColor: Colors.grey.shade400,
                highlightColor: Colors.grey.shade300,
                child: Icon(
                  Icons.chevron_right,
                  color: Colors.grey.shade400,
                ),
              ),
            ],
          ),
          const Divider(),
        ],
      ),
    );
  }
}
