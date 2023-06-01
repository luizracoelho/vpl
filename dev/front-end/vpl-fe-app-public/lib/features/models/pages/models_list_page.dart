import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shimmer/shimmer.dart';
import 'package:vpl/features/models/states/models_list_state.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';
import 'package:vpl/features/shared/states/primary_flow_state.dart';

import '../models/model.dart';
import '../service/model_service.dart';

class ModelsListPage extends StatelessWidget {
  const ModelsListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ModelsListState>(builder: (_, listState, listChild) {
      return Scaffold(
        appBar: AppBar(title: Text('VPL Modelos')
            // Text(state.brand == null ? 'VPL Modelos' : state.brand!.name),
            ),
        drawer: const VplDrawer(),
        body: SafeArea(
          child: FutureBuilder(
            future: listState.listModels(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.none ||
                  snapshot.connectionState == ConnectionState.waiting) {
                return Padding(
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
                );
              } else if (!snapshot.hasError) {
                return listState.models?.isEmpty ?? true
                    ? const Center(
                        child: Text(
                          'Nenhum modelo encontrado',
                        ),
                      )
                    : RefreshIndicator(
                        color: Theme.of(context).primaryColor,
                        onRefresh: () async => listState.refresh(),
                        child: Consumer<PrimaryFlowState>(
                            builder: (_, flowState, flowChild) {
                          return ListView.builder(
                            itemCount: listState.models?.length ?? 0,
                            itemBuilder: (_, index) {
                              final Model model = listState.models![index];

                              return Column(
                                children: [
                                  ListTile(
                                    leading: CircleAvatar(
                                        backgroundImage:
                                            NetworkImage(model.brandLogo)),
                                    title: Text(model.name),
                                    trailing: const Icon(Icons.chevron_right),
                                    onTap: () {
                                      flowState.selectModel(model);
                                      Navigator.of(context)
                                          .pushNamed('/vehicles');
                                    },
                                  ),
                                  const Divider(),
                                ],
                              );
                            },
                          );
                        }),
                      );
              }
              return Container();
            },
          ),
        ),
      );
    });
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

// class _ModelsListPageState extends State<ModelsListPage> {
//   List<Model>? models;
//   bool isLoading = true;

//   @override
//   void initState() {
//     super.initState();

//     listModels();
//   }

//   Future<void> listModels() async {
//     setState(() {
//       isLoading = true;
//     });

//     models = await ModelService.instance.list();

//     setState(() {
//       isLoading = false;
//     });
//   }
// }
