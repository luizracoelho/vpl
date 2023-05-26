import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';

import '../models/model.dart';
import '../service/model_service.dart';

class ModelsListPage extends StatefulWidget {
  const ModelsListPage({super.key});

  @override
  State<ModelsListPage> createState() => _ModelsListPageState();
}

class _ModelsListPageState extends State<ModelsListPage> {
  List<Model>? models;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();

    listModels();
  }

  Future<void> listModels() async {
    setState(() {
      isLoading = true;
    });

    models = await ModelService.instance.list();

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
            : models?.isEmpty ?? true
                ? const Center(
                    child: Text(
                      'Nenhum modelo encontrado',
                    ),
                  )
                : RefreshIndicator(
                    color: Theme.of(context).primaryColor,
                    onRefresh: () async => listModels(),
                    child: ListView.builder(
                      itemCount: models?.length ?? 0,
                      itemBuilder: (_, index) {
                        final Model model = models![index];
                        return Column(
                          children: [
                            ListTile(
                              title: Text(model.name),
                              trailing: const Icon(Icons.chevron_right),
                              onTap: () {
                                Navigator.of(context).pushNamed(
                                  '/models/vehicles',
                                  arguments: model.id,
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
