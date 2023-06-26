import React from 'react';
import './artifactTypeIcon.css';

// tslint:disable-next-line:interface-name
export class ArtifactTypes {
  public static getTitle(type: string): string {
    let title: string = type;
    switch (type) {
      case 'AVRO':
        title = 'Avro Schema';
        break;
      case 'PROTOBUF':
        title = 'Protobuf Schema';
        break;
      case 'JSON':
        title = 'JSON Schema';
        break;
      case 'OPENAPI':
        title = 'OpenAPI Definition';
        break;
      case 'ASYNCAPI':
        title = 'AsyncAPI Definition';
        break;
      case 'GRAPHQL':
        title = 'GraphQL Definition';
        break;
      case 'KCONNECT':
        title = 'Kafka Connect Schema';
        break;
      case 'WSDL':
        title = 'WSDL';
        break;
      case 'XSD':
        title = 'XML Schema';
        break;
      case 'XML':
        title = 'XML';
        break;
      default:
        title = '';
        break;
    }
    return title;
  }

  public static getLabel(type: string): string {
    let title: string = type;
    switch (type) {
      case 'AVRO':
        title = 'Avro Schema';
        break;
      case 'PROTOBUF':
        title = 'Protocol Buffer Schema';
        break;
      case 'JSON':
        title = 'JSON Schema';
        break;
      case 'OPENAPI':
        title = 'OpenAPI';
        break;
      case 'ASYNCAPI':
        title = 'AsyncAPI';
        break;
      case 'GRAPHQL':
        title = 'GraphQL';
        break;
      case 'KCONNECT':
        title = 'Kafka Connect Schema';
        break;
      case 'WSDL':
        title = 'WSDL';
        break;
      case 'XSD':
        title = 'XML Schema';
        break;
      case 'XML':
        title = 'XML';
        break;
      default:
        title = 'XML';
        break;
    }
    return title;
  }

  public static getClassNames(type: string): string {
    let classes: string = 'artifact-type-icon';
    switch (type) {
      case 'AVRO':
        classes += ' avro-icon24';
        break;
      case 'PROTOBUF':
        classes += ' protobuf-icon24';
        break;
      case 'JSON':
        classes += ' json-icon24';
        break;
      case 'OPENAPI':
        classes += ' oai-icon24';
        break;
      case 'ASYNCAPI':
        classes += ' aai-icon24';
        break;
      case 'GRAPHQL':
        classes += ' graphql-icon24';
        break;
      case 'KCONNECT':
        classes += ' kconnect-icon24';
        break;
      case 'WSDL':
        classes += ' xml-icon24';
        break;
      case 'XSD':
        classes += ' xml-icon24';
        break;
      case 'XML':
        classes += ' xml-icon24';
        break;
      default:
        classes += ' questionmark-icon24';
        break;
    }
    return classes;
  }
}

export const ArtifactTypeIcon = (props: { type: string }) => {
  return (
    <div
      className={ArtifactTypes.getClassNames(props.type)}
      title={ArtifactTypes.getTitle(props.type)}
    />
  );
};
