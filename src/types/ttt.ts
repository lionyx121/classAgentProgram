declare module "d3" {
  import { DefineComponent } from "vue";

  interface Node {
    id: string | number;
    name?: string;
    _color?: string;
    _size?: number;
    [key: string]: any;
  }

  interface Link {
    sid: string | number; // source id
    tid: string | number; // target id
    _color?: string;
    _width?: number;
    [key: string]: any;
  }

  interface Options {
    force?: number;
    nodeSize?: number;
    linkWidth?: number;
    canvas?: boolean;
    [key: string]: any;
  }

  const D3Network: DefineComponent<{
    netNodes: Node[];
    netLinks: Link[];
    options?: Options;
    nodeLabels?: boolean;
    linkLabels?: boolean;
  }>;

  export default D3Network;
}
