import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shimmer/shimmer.dart';
import 'package:vpl/features/referenceYears/models/reference_years.dart';
import 'package:vpl/features/referenceYears/states/reference_years_list_state.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';

import '../../../utils.dart';

class ReferenceYearsListPage extends StatelessWidget {
  const ReferenceYearsListPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer<PriceListFlowState>(builder: (context, flowState, child) {
      return Scaffold(
        appBar: AppBar(
          title: Column(
            children: [
              Text('Anos de Referência', style: Theme.of(context).textTheme.bodySmall),
              Text(flowState.priceReference!.name),
            ],
          ),
        ),
        body: SafeArea(
          child: LayoutBuilder(builder: (context, constraints) {
            return Consumer<ReferenceYearsListState>(builder: (context, listState, child) {
              return FutureBuilder(
                future: listState.listReferenceYears(flowState.priceReference!),
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
                    return listState.referencesYears?.isEmpty ?? true
                        ? const Center(
                            child: Text(
                              'Nenhum ano de referência encontrado',
                            ),
                          )
                        : RefreshIndicator(
                            color: Theme.of(context).primaryColor,
                            onRefresh: () async => listState.refresh(),
                            child: GridView.builder(
                              gridDelegate: getGridDelegate(constraints),
                              itemCount: listState.referencesYears?.length ?? 0,
                              itemBuilder: (_, index) {
                                final ReferenceYear referenceYear = listState.referencesYears![index];

                                return Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Column(
                                    children: [
                                      ListTile(
                                        title: Text(referenceYear.year.toString()),
                                        trailing: const Icon(Icons.chevron_right),
                                        onTap: () {
                                          flowState.selectYear(referenceYear.year!);
                                          Navigator.of(context).pushNamed('/vehicles');
                                        },
                                      ),
                                      const Divider(),
                                    ],
                                  ),
                                );
                              },
                            ),
                          );
                  }
                  return Center(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Text(
                        snapshot.error.toString(),
                        style: const TextStyle(color: Colors.red),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  );
                },
              );
            });
          }),
        ),
      );
    });
  }

  SliverGridDelegateWithFixedCrossAxisCount getGridDelegate(BoxConstraints constraints) {
    if (isIpad(constraints)) {
      return const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, childAspectRatio: 3);
    } else if (isIphoneLandscape(constraints)) {
      return const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, childAspectRatio: 4);
    } else {
      return const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 1, childAspectRatio: 4.25);
    }
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
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Shimmer.fromColors(
                    baseColor: Colors.grey.shade400,
                    highlightColor: Colors.grey.shade300,
                    child: Container(
                      height: 12,
                      width: 100,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(6),
                      ),
                    ),
                  ),
                ],
              ),
              Shimmer.fromColors(
                baseColor: Colors.grey.shade400,
                highlightColor: Colors.grey.shade300,
                child: Container(
                  height: 24,
                  width: 24,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
