#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

#include <cstddef>

namespace tfjs {
namespace wasm {
// We use C-style API to interface with Javascript.
extern "C" {

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_KEEPALIVE
#endif
void Conv2dDerInput() {
  // TODO: Revert to actual implementation
}

}  // extern "C"
}  // namespace wasm
}  // namespace tfjs

