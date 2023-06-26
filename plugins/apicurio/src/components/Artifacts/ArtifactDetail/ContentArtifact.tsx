import React, { useEffect } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-protobuf';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-graphqlschema';
import 'ace-builds/src-noconflict/theme-monokai';
import YAML from 'yaml';

const getEditorMode = (artifactType: string): string => {
  if (artifactType === 'PROTOBUF') {
    return 'protobuf';
  }
  if (
    artifactType === 'WSDL' ||
    artifactType === 'XSD' ||
    artifactType === 'XML'
  ) {
    return 'xml';
  }
  if (artifactType === 'GRAPHQL') {
    return 'graphqlschema';
  }
  return 'json';
};

const formatContent = (artifactContent: string): string => {
  try {
    const pval: any = JSON.parse(artifactContent);
    if (pval) {
      return JSON.stringify(pval, null, 2);
    }
  } catch (e) {
    // Do nothing
  }
  return artifactContent;
};
export const ContentArtifact = (props: {
  artifactContent: string;
  artifactType: string;
}) => {
  const [editorMode, setEditorMode] = React.useState<string>(
    getEditorMode(props.artifactType),
  );
  const [editorHeight, setEditorHeight] = React.useState<string>('500px');
  const [content, setContent] = React.useState<string>(
    formatContent(props.artifactContent),
  );

  useEffect(() => {
    setContent(props.artifactContent);
    const elem: HTMLElement | null = document.getElementById('ace-wrapper');
    if (elem) {
      const height: number | null = elem.clientHeight;
      if (height) {
        setEditorHeight(`${height} px`);
      }
    }
  }, [props.artifactContent]);

  const switchJsonYaml = (_: React.MouseEvent<HTMLElement>, mode: string) => {
    if (mode !== editorMode) {
      let contentFormat: string = `Error formatting code to: ${mode}`;
      try {
        if (mode === 'yaml') {
          contentFormat = YAML.stringify(
            JSON.parse(props.artifactContent),
            null,
            4,
          );
        } else {
          contentFormat = JSON.stringify(
            YAML.parse(props.artifactContent),
            null,
            2,
          );
        }
      } catch (e) {
        // Do nothing
      }
      setEditorMode(mode);
      setContent(contentFormat);
    }
  };

  return (
    <div className="ace-wrapper" id="ace-wrapper">
      {!(editorMode === 'json' || editorMode === 'yaml') ? null : (
        <ToggleButtonGroup
          value={editorMode}
          exclusive
          onChange={switchJsonYaml}
          aria-label="Switch Json to Yaml"
        >
          <ToggleButton value="json" aria-label="json">
            JSON
          </ToggleButton>
          <ToggleButton value="yaml" aria-label="yaml">
            YAML
          </ToggleButton>
        </ToggleButtonGroup>
      )}
      <AceEditor
        data-testid="ace-content"
        mode={editorMode}
        theme="monokai"
        name="artifactContent"
        className="artifactContent"
        width="100%"
        height={editorHeight}
        fontSize={14}
        showPrintMargin={false}
        showGutter
        highlightActiveLine={false}
        value={content}
        readOnly
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false,
        }}
      />
    </div>
  );
};
