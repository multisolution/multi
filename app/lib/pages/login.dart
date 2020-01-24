import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Title'),
        ),
        body: Column(
          children: <Widget>[
            FutureBuilder(
              builder: (BuildContext context, AsyncSnapshot<String> snapshot) {
                if (snapshot.hasData) {
                  print(snapshot.data);
                  return Container();
                  // return Mutation(
                  //   options: MutationOptions(
                  //     document: snapshot.data,
                  //   ),
                  //   builder: (
                  //     RunMutation runMutation,
                  //     QueryResult result,
                  //   ) {
                  //     return FloatingActionButton(
                  //       onPressed: () => runMutation({
                  //         "email": "multi@multisolution.art.br",
                  //         "password": "multi"
                  //       }),
                  //       tooltip: 'Star',
                  //       child: Text(result.data.toString()),
                  //     );
                  //   },
                  //   onCompleted: (dynamic result) {
                  //     print('onComplpeted');
                  //     print(result.data);
                  //   },
                  // );
                } else {
                  return Container();
                }
              },
              future: loadAsset(),
            )
          ],
        ));
  }

  Future<String> loadAsset() async {
    return await rootBundle.loadString('assets/mlogin.graphql');
  }
}
