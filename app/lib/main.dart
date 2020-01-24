import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:multi/pages/login.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  ValueNotifier<GraphQLClient> client = ValueNotifier(
    GraphQLClient(
      cache: NormalizedInMemoryCache(
        dataIdFromObject: typenameDataIdFromObject,
      ),
      link: HttpLink(
        uri: 'http://localhost:8000',
      ),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
      client: client,
      child: MaterialApp(
        title: 'Title',
        home: Login(),
      ),
    );
  }
}
