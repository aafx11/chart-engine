type CreateStackY = (
  data: {
    index: number[];
    values: {
      [key: string]: any[];
    };
  }
) => {
  index: number[];
  values: {
    [key: string]: any[];
  };
};

type CreateNormalizeY = (
  data: {
    index: number[];
    values: {
      [key: string]: any[];
    };
  }
) => {
  index: number[];
  values: {
    [key: string]: any[];
  };
};

type CreateSymmetryY = (
  data: {
    index: number[];
    values: {
      [key: string]: any[];
    };
  }
) => {
  index: number[];
  values: {
    [key: string]: any[];
  };
};

type CreateBinX = (
  binXOptions: {
    count: number,
    channel: string,
    aggregate: (values: any[]) => number;
  }
) => (
  data: {
    index: number[];
    values: {
      [key: string]: any[];
    };
  }
) => void;

export {
  CreateStackY,
  CreateNormalizeY,
  CreateSymmetryY,
  CreateBinX
};