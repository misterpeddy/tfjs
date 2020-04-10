import {backend_util, TensorInfo, NamedTensorInfoMap, registerKernel, KernelFunc} from '@tensorflow/tfjs-core';

import {BackendWasm} from '../backend_wasm';

// TODO: revert to the interface of the actual implementation
let wasmConv2dDerInput: () => void;

interface Conv2dDerInputs extends NamedTensorInfoMap {
  dy: TensorInfo;
  filter: TensorInfo;
}

function setup(backend: BackendWasm) {
  wasmConv2dDerInput = backend.wasm.cwrap('Conv2dDerInput', null /* void */, []);
}

function conv2dDerInput(args: {
  inputs: Conv2dDerInputs,
  backend: BackendWasm,
  attrs: backend_util.Conv2DInfo
}) {

  const {attrs, backend} = args;
  const convInfo = attrs;

  const out = backend.makeOutput(convInfo.outShape, 'float32');

  // dummy call
  wasmConv2dDerInput();

  return out;
}

registerKernel({
  kernelName: 'Conv2dDerInput',
  backendName: 'wasm',
  setupFunc: setup,
  kernelFunc: conv2dDerInput as {} as KernelFunc
});
