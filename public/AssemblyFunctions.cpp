#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <emscripten.h>

EMSCRIPTEN_KEEP_ALIVE float soma(float a, float b);
EMSCRIPTEN_KEEP_ALIVE float subtracao(float a, float b);
EMSCRIPTEN_KEEP_ALIVE float divisao(float a, float b);
EMSCRIPTEN_KEEP_ALIVE float multiplicacao(float a, float b);
EMSCRIPTEN_KEEP_ALIVE float sin(float a, int isRadiano);
EMSCRIPTEN_KEEP_ALIVE float cos(float a, int isRadiano);
EMSCRIPTEN_KEEP_ALIVE float tg(float a, int isRadiano);
EMSCRIPTEN_KEEP_ALIVE float my_arcsin(float a, int isRadiano);
EMSCRIPTEN_KEEP_ALIVE float my_arccos(float a, int isRadiano);
EMSCRIPTEN_KEEP_ALIVE float my_arctg(float a, int isRadiano);
EMSCRIPTEN_KEEP_ALIVE float sqrt(float a);
EMSCRIPTEN_KEEP_ALIVE float xElevadoAoQuadrado(float a);
EMSCRIPTEN_KEEP_ALIVE float RaizNdeX(float x, float n);
EMSCRIPTEN_KEEP_ALIVE float log(float x, float a);
EMSCRIPTEN_KEEP_ALIVE float xElevadoAy(float x, float y);
EMSCRIPTEN_KEEP_ALIVE float fatorial(int x);

#ifdef __cplusplus

    void AssemblyGrauRaidano(float& a) {
        float constante = 180;
        asm (
            "fldpi\n"
            "fmulp st(1), st(0)\n"
            "fld %[constante]\n"
            "fdivp st(1), st(0)\n"
            : [a] "+m" (a)
            : [constante] "m" (constante)
        );
    }

    float soma(float a, float b)
    {
        asm(
            "finit\n"
            "fld %[a]\n"
            "fld %[b]\n"
            "faddp st(1), st(0)\n"
            "fst %[a]\n"
            : [a] "+m" (a)
            : [b] "m" (b)
        );
        return a;
    }

    float subtracao(float a, float b)
    {
        asm(
            "finit\n"
            "fld %[a]\n"
            "fld %[b]\n"
            "fsubp st(1), st(0)\n"
            "fst %[a]\n"
            : [a] "+m" (a)
            : [b] "m" (b)
        );
        return a;
    }

    float divisao(float a, float b) {
        asm(
            "finit\n"
            "fld %[a]\n"
            "fld %[b]\n"
            "fdivp st(1), st(0)\n"
            "fst %[a]\n"
            : [a] "+m" (a)
            : [b] "m" (b)
        );
        return a;
    }

    float multiplicacao(float a, float b) {
        asm(
            "finit\n"
            "fld %[a]\n"
            "fld %[b]\n"
            "fmulp st(1), st(0)\n"
            "fst %[a]\n"
            : [a] "+m" (a)
            : [b] "m" (b)
        );
        return a;
    }

    float sin(float a, int isRadiano) {
        if (isRadiano - 1 == 0) {
            AssemblyGrauRaidano(a);
        }
        asm (
            "finit\n"
            "fld %[a]\n"
            "fsin\n"
            "fst %[a]\n"
            : [a] "+m" (a)
        );
        return a;
    }

    float cos(float a, int isRadiano) {
        if (isRadiano - 1 == 0) {
            AssemblyGrauRaidano(a);
        }
        asm (
            "finit\n"
            "fld %[a]\n"
            "fcos\n"
            "fst %[a]\n"
            : [a] "+m" (a)
        );
        return a;
    }

    float tg(float a, int isRadiano) {
        if (isRadiano - 1 == 0) {
            AssemblyGrauRaidano(a);
        }
        asm (
            "finit\n"
            "fld %[a]\n"
            "fsincos\n"
            "fdivp st(1), st(0)\n"
            "fst %[a]\n"
            : [a] "+m" (a)
        );
        return a;
    }

    float arcsin(float a, int isRadiano) {
        if (isRadiano - 1 == 0) {
            AssemblyGrauRaidano(a);
        }
        asm (
            "fld %[a]\n"
            "fsin\n"
            "fld1\n"
            "fsubrp st(1), st(0)\n"
            "fld1\n"
            "fld %[a]\n"
            "fmul\n"
            "fsqrt\n"
            "fpatan\n"
            "fst %[a]\n"
            : [a] "+m" (a)
        );
        return a;
    }


    float arccos(float a, int isRadiano) {
        if (isRadiano - 1 == 0) {
            AssemblyGrauRaidano(a);
        }
        asm (
            "fld %[a]\n"
            "fld %[a]\n"
            "fmul\n"
            "fld1\n"
            "fsubrp st(1), st(0)\n"
            "fld1\n"
            "fld %[a]\n"
            "fmul\n"
            "fsqrt\n"
            "fpatan\n"
            "fst %[a]\n"
            : [a] "+m" (a)
        );
        return a;
    }


    float arctg(float a, int isRadiano) {
        if (isRadiano - 1 == 0) {
            AssemblyGrauRaidano(a);
        }
        asm (
            "fld %[a]\n"
            "fld1\n"
            "fpatan\n"
            "fst %[a]\n"
            : [a] "+m" (a)
        );
        return a;
    }


    float sqrt(float a) {
        asm(
            "finit\n"
            "fld %[a]\n"
            "fsqrt\n"
            "fst %[a]\n"
            : [a] "+m" (a)
        );
        return a;
    }

    float xElevadoAoQuadrado(float a) {
        asm(
            "finit\n"
            "fld %[a]\n"
            "fld %[a]\n"
            "fmulp st(1), st(0)\n"
            "fst %[a]\n"
            : [a] "+m" (a)
        );
        return a;
    }

    float RaizNdeX(float x, float n) {
        asm(
            "finit\n"
            "fld1\n"
            "fld %[n]\n"
            "fdivp st(1), st(0)\n"
            "fst %[n]\n"
            : [n] "+m" (n)
        );

        x = xElevadoAy(x, n);
        return x;
    }

    float log(float x, float a) {
        asm(
            "finit\n"
            "fld1\n"
            "fld %[a]\n"
            "fyl2x\n"
            "fld1\n"
            "fdiv st, st(1)\n"
            "fld1\n"
            "fld %[x]\n"
            "fyl2x\n"
            "fmul\n"
            "fst %[x]\n"
            : [x] "+m" (x)
            : [a] "m" (a)
        );
        return x;
    }

    float xElevadoAy(float x, float y) {
        asm(
            "finit\n"
            "fld %[y]\n"
            "fld1\n"
            "fld %[x]\n"
            "fyl2x\n"
            "fmul\n"
            "fld st\n"
            "frndint\n"
            "fsub st(1), st\n"
            "fxch\n"
            "f2xm1\n"
            "fld1\n"
            "fadd\n"
            "fscale\n"
            "fst %[x]\n"
            : [x] "+m" (x)
            : [y] "m" (y)
        );
        return x;
    }

    float fatorial(int x) {
        float result;
        asm(
            "finit\n"
            "fld1\n"
            "fldz\n"
            "mov %[x], %[counter]\n"
            "_loop:\n"
            "fld1\n"
            "faddp st(1), st(0)\n"
            "fmul st(1), st(0)\n"
            "dec %[counter]\n"
            "jnz _loop\n"
            "fstp %[x]\n"
            "mov %[x], %[result]\n"
            : [x] "+m" (x), [result] "=m" (result), [counter] "+m" (x)
            :
            :
        );
        return result;
    }

#endif

#ifdef __cplusplus
}
#endif

