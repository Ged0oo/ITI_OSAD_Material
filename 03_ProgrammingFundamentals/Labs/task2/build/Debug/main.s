	.file	"main.c"
	.text
.Ltext0:
	.file 0 "/home/nagy/Desktop/test/c" "/home/nagy/Desktop/test/c/main.c"
	.section	.rodata
.LC0:
	.string	"X: %ld\n"
	.text
	.globl	main
	.type	main, @function
main:
.LFB0:
	.file 1 "/home/nagy/Desktop/test/c/main.c"
	.loc 1 5 11
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	.loc 1 6 9
	movq	$15, -8(%rbp)
	.loc 1 7 5
	movq	-8(%rbp), %rax
	movq	%rax, %rsi
	leaq	.LC0(%rip), %rax
	movq	%rax, %rdi
	movl	$0, %eax
	call	printf@PLT
	.loc 1 8 12
	movl	$0, %eax
	.loc 1 9 1
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE0:
	.size	main, .-main
.Letext0:
	.file 2 "/usr/include/stdio.h"
	.section	.debug_info,"",@progbits
.Ldebug_info0:
	.long	0xbd
	.value	0x5
	.byte	0x1
	.byte	0x8
	.long	.Ldebug_abbrev0
	.uleb128 0x2
	.long	.LASF707
	.byte	0x1d
	.long	.LASF0
	.long	.LASF1
	.quad	.Ltext0
	.quad	.Letext0-.Ltext0
	.long	.Ldebug_line0
	.long	.Ldebug_macro0
	.uleb128 0x1
	.byte	0x8
	.byte	0x7
	.long	.LASF699
	.uleb128 0x1
	.byte	0x4
	.byte	0x7
	.long	.LASF700
	.uleb128 0x1
	.byte	0x1
	.byte	0x8
	.long	.LASF701
	.uleb128 0x1
	.byte	0x2
	.byte	0x7
	.long	.LASF702
	.uleb128 0x1
	.byte	0x1
	.byte	0x6
	.long	.LASF703
	.uleb128 0x1
	.byte	0x2
	.byte	0x5
	.long	.LASF704
	.uleb128 0x3
	.byte	0x4
	.byte	0x5
	.string	"int"
	.uleb128 0x1
	.byte	0x8
	.byte	0x5
	.long	.LASF705
	.uleb128 0x1
	.byte	0x1
	.byte	0x6
	.long	.LASF706
	.uleb128 0x4
	.long	0x6a
	.uleb128 0x5
	.long	.LASF708
	.byte	0x2
	.value	0x164
	.byte	0xc
	.long	0x5c
	.long	0x8e
	.uleb128 0x6
	.long	0x8e
	.uleb128 0x7
	.byte	0
	.uleb128 0x8
	.byte	0x8
	.long	0x71
	.uleb128 0x9
	.long	.LASF709
	.byte	0x1
	.byte	0x5
	.byte	0x5
	.long	0x63
	.quad	.LFB0
	.quad	.LFE0-.LFB0
	.uleb128 0x1
	.byte	0x9c
	.uleb128 0xa
	.string	"x"
	.byte	0x1
	.byte	0x6
	.byte	0x9
	.long	0x63
	.uleb128 0x2
	.byte	0x91
	.sleb128 -24
	.byte	0
	.byte	0
	.section	.debug_abbrev,"",@progbits
.Ldebug_abbrev0:
	.uleb128 0x1
	.uleb128 0x24
	.byte	0
	.uleb128 0xb
	.uleb128 0xb
	.uleb128 0x3e
	.uleb128 0xb
	.uleb128 0x3
	.uleb128 0xe
	.byte	0
	.byte	0
	.uleb128 0x2
	.uleb128 0x11
	.byte	0x1
	.uleb128 0x25
	.uleb128 0xe
	.uleb128 0x13
	.uleb128 0xb
	.uleb128 0x3
	.uleb128 0x1f
	.uleb128 0x1b
	.uleb128 0x1f
	.uleb128 0x11
	.uleb128 0x1
	.uleb128 0x12
	.uleb128 0x7
	.uleb128 0x10
	.uleb128 0x17
	.uleb128 0x79
	.uleb128 0x17
	.byte	0
	.byte	0
	.uleb128 0x3
	.uleb128 0x24
	.byte	0
	.uleb128 0xb
	.uleb128 0xb
	.uleb128 0x3e
	.uleb128 0xb
	.uleb128 0x3
	.uleb128 0x8
	.byte	0
	.byte	0
	.uleb128 0x4
	.uleb128 0x26
	.byte	0
	.uleb128 0x49
	.uleb128 0x13
	.byte	0
	.byte	0
	.uleb128 0x5
	.uleb128 0x2e
	.byte	0x1
	.uleb128 0x3f
	.uleb128 0x19
	.uleb128 0x3
	.uleb128 0xe
	.uleb128 0x3a
	.uleb128 0xb
	.uleb128 0x3b
	.uleb128 0x5
	.uleb128 0x39
	.uleb128 0xb
	.uleb128 0x27
	.uleb128 0x19
	.uleb128 0x49
	.uleb128 0x13
	.uleb128 0x3c
	.uleb128 0x19
	.uleb128 0x1
	.uleb128 0x13
	.byte	0
	.byte	0
	.uleb128 0x6
	.uleb128 0x5
	.byte	0
	.uleb128 0x49
	.uleb128 0x13
	.byte	0
	.byte	0
	.uleb128 0x7
	.uleb128 0x18
	.byte	0
	.byte	0
	.byte	0
	.uleb128 0x8
	.uleb128 0xf
	.byte	0
	.uleb128 0xb
	.uleb128 0xb
	.uleb128 0x49
	.uleb128 0x13
	.byte	0
	.byte	0
	.uleb128 0x9
	.uleb128 0x2e
	.byte	0x1
	.uleb128 0x3f
	.uleb128 0x19
	.uleb128 0x3
	.uleb128 0xe
	.uleb128 0x3a
	.uleb128 0xb
	.uleb128 0x3b
	.uleb128 0xb
	.uleb128 0x39
	.uleb128 0xb
	.uleb128 0x49
	.uleb128 0x13
	.uleb128 0x11
	.uleb128 0x1
	.uleb128 0x12
	.uleb128 0x7
	.uleb128 0x40
	.uleb128 0x18
	.uleb128 0x7c
	.uleb128 0x19
	.byte	0
	.byte	0
	.uleb128 0xa
	.uleb128 0x34
	.byte	0
	.uleb128 0x3
	.uleb128 0x8
	.uleb128 0x3a
	.uleb128 0xb
	.uleb128 0x3b
	.uleb128 0xb
	.uleb128 0x39
	.uleb128 0xb
	.uleb128 0x49
	.uleb128 0x13
	.uleb128 0x2
	.uleb128 0x18
	.byte	0
	.byte	0
	.byte	0
	.section	.debug_aranges,"",@progbits
	.long	0x2c
	.value	0x2
	.long	.Ldebug_info0
	.byte	0x8
	.byte	0
	.value	0
	.value	0
	.quad	.Ltext0
	.quad	.Letext0-.Ltext0
	.quad	0
	.quad	0
	.section	.debug_macro,"",@progbits
.Ldebug_macro0:
	.value	0x5
	.byte	0x2
	.long	.Ldebug_line0
	.byte	0x7
	.long	.Ldebug_macro2
	.byte	0x3
	.uleb128 0
	.uleb128 0x1
	.file 3 "/usr/include/stdc-predef.h"
	.byte	0x3
	.uleb128 0
	.uleb128 0x3
	.byte	0x7
	.long	.Ldebug_macro3
	.byte	0x4
	.byte	0x3
	.uleb128 0x1
	.uleb128 0x2
	.byte	0x7
	.long	.Ldebug_macro4
	.file 4 "/usr/include/x86_64-linux-gnu/bits/libc-header-start.h"
	.byte	0x3
	.uleb128 0x1b
	.uleb128 0x4
	.byte	0x6
	.uleb128 0x1f
	.long	.LASF371
	.file 5 "/usr/include/features.h"
	.byte	0x3
	.uleb128 0x21
	.uleb128 0x5
	.byte	0x7
	.long	.Ldebug_macro5
	.file 6 "/usr/include/features-time64.h"
	.byte	0x3
	.uleb128 0x188
	.uleb128 0x6
	.file 7 "/usr/include/x86_64-linux-gnu/bits/wordsize.h"
	.byte	0x3
	.uleb128 0x14
	.uleb128 0x7
	.byte	0x7
	.long	.Ldebug_macro6
	.byte	0x4
	.file 8 "/usr/include/x86_64-linux-gnu/bits/timesize.h"
	.byte	0x3
	.uleb128 0x15
	.uleb128 0x8
	.byte	0x3
	.uleb128 0x13
	.uleb128 0x7
	.byte	0x7
	.long	.Ldebug_macro6
	.byte	0x4
	.byte	0x5
	.uleb128 0x1a
	.long	.LASF426
	.byte	0x4
	.byte	0x4
	.byte	0x7
	.long	.Ldebug_macro7
	.file 9 "/usr/include/x86_64-linux-gnu/sys/cdefs.h"
	.byte	0x3
	.uleb128 0x1e6
	.uleb128 0x9
	.byte	0x7
	.long	.Ldebug_macro8
	.byte	0x3
	.uleb128 0x22f
	.uleb128 0x7
	.byte	0x7
	.long	.Ldebug_macro6
	.byte	0x4
	.file 10 "/usr/include/x86_64-linux-gnu/bits/long-double.h"
	.byte	0x3
	.uleb128 0x230
	.uleb128 0xa
	.byte	0x5
	.uleb128 0x15
	.long	.LASF505
	.byte	0x4
	.byte	0x7
	.long	.Ldebug_macro9
	.byte	0x4
	.file 11 "/usr/include/x86_64-linux-gnu/gnu/stubs.h"
	.byte	0x3
	.uleb128 0x1fe
	.uleb128 0xb
	.file 12 "/usr/include/x86_64-linux-gnu/gnu/stubs-64.h"
	.byte	0x3
	.uleb128 0xa
	.uleb128 0xc
	.byte	0x7
	.long	.Ldebug_macro10
	.byte	0x4
	.byte	0x4
	.byte	0x4
	.byte	0x7
	.long	.Ldebug_macro11
	.byte	0x4
	.byte	0x7
	.long	.Ldebug_macro12
	.file 13 "/usr/lib/gcc/x86_64-linux-gnu/11/include/stddef.h"
	.byte	0x3
	.uleb128 0x21
	.uleb128 0xd
	.byte	0x7
	.long	.Ldebug_macro13
	.byte	0x4
	.byte	0x5
	.uleb128 0x23
	.long	.LASF568
	.file 14 "/usr/lib/gcc/x86_64-linux-gnu/11/include/stdarg.h"
	.byte	0x3
	.uleb128 0x24
	.uleb128 0xe
	.byte	0x7
	.long	.Ldebug_macro14
	.byte	0x4
	.file 15 "/usr/include/x86_64-linux-gnu/bits/types.h"
	.byte	0x3
	.uleb128 0x26
	.uleb128 0xf
	.byte	0x5
	.uleb128 0x18
	.long	.LASF571
	.byte	0x3
	.uleb128 0x1b
	.uleb128 0x7
	.byte	0x7
	.long	.Ldebug_macro6
	.byte	0x4
	.byte	0x3
	.uleb128 0x1c
	.uleb128 0x8
	.byte	0x3
	.uleb128 0x13
	.uleb128 0x7
	.byte	0x7
	.long	.Ldebug_macro6
	.byte	0x4
	.byte	0x5
	.uleb128 0x1a
	.long	.LASF426
	.byte	0x4
	.byte	0x7
	.long	.Ldebug_macro15
	.file 16 "/usr/include/x86_64-linux-gnu/bits/typesizes.h"
	.byte	0x3
	.uleb128 0x8d
	.uleb128 0x10
	.byte	0x7
	.long	.Ldebug_macro16
	.byte	0x4
	.file 17 "/usr/include/x86_64-linux-gnu/bits/time64.h"
	.byte	0x3
	.uleb128 0x8e
	.uleb128 0x11
	.byte	0x7
	.long	.Ldebug_macro17
	.byte	0x4
	.byte	0x6
	.uleb128 0xe2
	.long	.LASF631
	.byte	0x4
	.file 18 "/usr/include/x86_64-linux-gnu/bits/types/__fpos_t.h"
	.byte	0x3
	.uleb128 0x27
	.uleb128 0x12
	.byte	0x5
	.uleb128 0x2
	.long	.LASF632
	.file 19 "/usr/include/x86_64-linux-gnu/bits/types/__mbstate_t.h"
	.byte	0x3
	.uleb128 0x5
	.uleb128 0x13
	.byte	0x5
	.uleb128 0x2
	.long	.LASF633
	.byte	0x4
	.byte	0x4
	.file 20 "/usr/include/x86_64-linux-gnu/bits/types/__fpos64_t.h"
	.byte	0x3
	.uleb128 0x28
	.uleb128 0x14
	.byte	0x5
	.uleb128 0x2
	.long	.LASF634
	.byte	0x4
	.file 21 "/usr/include/x86_64-linux-gnu/bits/types/__FILE.h"
	.byte	0x3
	.uleb128 0x29
	.uleb128 0x15
	.byte	0x5
	.uleb128 0x2
	.long	.LASF635
	.byte	0x4
	.file 22 "/usr/include/x86_64-linux-gnu/bits/types/FILE.h"
	.byte	0x3
	.uleb128 0x2a
	.uleb128 0x16
	.byte	0x5
	.uleb128 0x2
	.long	.LASF636
	.byte	0x4
	.file 23 "/usr/include/x86_64-linux-gnu/bits/types/struct_FILE.h"
	.byte	0x3
	.uleb128 0x2b
	.uleb128 0x17
	.byte	0x7
	.long	.Ldebug_macro18
	.byte	0x4
	.byte	0x7
	.long	.Ldebug_macro19
	.file 24 "/usr/include/x86_64-linux-gnu/bits/stdio_lim.h"
	.byte	0x3
	.uleb128 0x85
	.uleb128 0x18
	.byte	0x7
	.long	.Ldebug_macro20
	.byte	0x4
	.byte	0x7
	.long	.Ldebug_macro21
	.file 25 "/usr/include/x86_64-linux-gnu/bits/floatn.h"
	.byte	0x3
	.uleb128 0x1ae
	.uleb128 0x19
	.byte	0x7
	.long	.Ldebug_macro22
	.file 26 "/usr/include/x86_64-linux-gnu/bits/floatn-common.h"
	.byte	0x3
	.uleb128 0x77
	.uleb128 0x1a
	.byte	0x5
	.uleb128 0x15
	.long	.LASF676
	.byte	0x3
	.uleb128 0x18
	.uleb128 0xa
	.byte	0x5
	.uleb128 0x15
	.long	.LASF505
	.byte	0x4
	.byte	0x7
	.long	.Ldebug_macro23
	.byte	0x4
	.byte	0x4
	.byte	0x4
	.byte	0x5
	.uleb128 0x3
	.long	.LASF698
	.byte	0x4
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.0.3b9ef5c4ac77985394dd1c2bc5ebbebd,comdat
.Ldebug_macro2:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0
	.long	.LASF2
	.byte	0x5
	.uleb128 0
	.long	.LASF3
	.byte	0x5
	.uleb128 0
	.long	.LASF4
	.byte	0x5
	.uleb128 0
	.long	.LASF5
	.byte	0x5
	.uleb128 0
	.long	.LASF6
	.byte	0x5
	.uleb128 0
	.long	.LASF7
	.byte	0x5
	.uleb128 0
	.long	.LASF8
	.byte	0x5
	.uleb128 0
	.long	.LASF9
	.byte	0x5
	.uleb128 0
	.long	.LASF10
	.byte	0x5
	.uleb128 0
	.long	.LASF11
	.byte	0x5
	.uleb128 0
	.long	.LASF12
	.byte	0x5
	.uleb128 0
	.long	.LASF13
	.byte	0x5
	.uleb128 0
	.long	.LASF14
	.byte	0x5
	.uleb128 0
	.long	.LASF15
	.byte	0x5
	.uleb128 0
	.long	.LASF16
	.byte	0x5
	.uleb128 0
	.long	.LASF17
	.byte	0x5
	.uleb128 0
	.long	.LASF18
	.byte	0x5
	.uleb128 0
	.long	.LASF19
	.byte	0x5
	.uleb128 0
	.long	.LASF20
	.byte	0x5
	.uleb128 0
	.long	.LASF21
	.byte	0x5
	.uleb128 0
	.long	.LASF22
	.byte	0x5
	.uleb128 0
	.long	.LASF23
	.byte	0x5
	.uleb128 0
	.long	.LASF24
	.byte	0x5
	.uleb128 0
	.long	.LASF25
	.byte	0x5
	.uleb128 0
	.long	.LASF26
	.byte	0x5
	.uleb128 0
	.long	.LASF27
	.byte	0x5
	.uleb128 0
	.long	.LASF28
	.byte	0x5
	.uleb128 0
	.long	.LASF29
	.byte	0x5
	.uleb128 0
	.long	.LASF30
	.byte	0x5
	.uleb128 0
	.long	.LASF31
	.byte	0x5
	.uleb128 0
	.long	.LASF32
	.byte	0x5
	.uleb128 0
	.long	.LASF33
	.byte	0x5
	.uleb128 0
	.long	.LASF34
	.byte	0x5
	.uleb128 0
	.long	.LASF35
	.byte	0x5
	.uleb128 0
	.long	.LASF36
	.byte	0x5
	.uleb128 0
	.long	.LASF37
	.byte	0x5
	.uleb128 0
	.long	.LASF38
	.byte	0x5
	.uleb128 0
	.long	.LASF39
	.byte	0x5
	.uleb128 0
	.long	.LASF40
	.byte	0x5
	.uleb128 0
	.long	.LASF41
	.byte	0x5
	.uleb128 0
	.long	.LASF42
	.byte	0x5
	.uleb128 0
	.long	.LASF43
	.byte	0x5
	.uleb128 0
	.long	.LASF44
	.byte	0x5
	.uleb128 0
	.long	.LASF45
	.byte	0x5
	.uleb128 0
	.long	.LASF46
	.byte	0x5
	.uleb128 0
	.long	.LASF47
	.byte	0x5
	.uleb128 0
	.long	.LASF48
	.byte	0x5
	.uleb128 0
	.long	.LASF49
	.byte	0x5
	.uleb128 0
	.long	.LASF50
	.byte	0x5
	.uleb128 0
	.long	.LASF51
	.byte	0x5
	.uleb128 0
	.long	.LASF52
	.byte	0x5
	.uleb128 0
	.long	.LASF53
	.byte	0x5
	.uleb128 0
	.long	.LASF54
	.byte	0x5
	.uleb128 0
	.long	.LASF55
	.byte	0x5
	.uleb128 0
	.long	.LASF56
	.byte	0x5
	.uleb128 0
	.long	.LASF57
	.byte	0x5
	.uleb128 0
	.long	.LASF58
	.byte	0x5
	.uleb128 0
	.long	.LASF59
	.byte	0x5
	.uleb128 0
	.long	.LASF60
	.byte	0x5
	.uleb128 0
	.long	.LASF61
	.byte	0x5
	.uleb128 0
	.long	.LASF62
	.byte	0x5
	.uleb128 0
	.long	.LASF63
	.byte	0x5
	.uleb128 0
	.long	.LASF64
	.byte	0x5
	.uleb128 0
	.long	.LASF65
	.byte	0x5
	.uleb128 0
	.long	.LASF66
	.byte	0x5
	.uleb128 0
	.long	.LASF67
	.byte	0x5
	.uleb128 0
	.long	.LASF68
	.byte	0x5
	.uleb128 0
	.long	.LASF69
	.byte	0x5
	.uleb128 0
	.long	.LASF70
	.byte	0x5
	.uleb128 0
	.long	.LASF71
	.byte	0x5
	.uleb128 0
	.long	.LASF72
	.byte	0x5
	.uleb128 0
	.long	.LASF73
	.byte	0x5
	.uleb128 0
	.long	.LASF74
	.byte	0x5
	.uleb128 0
	.long	.LASF75
	.byte	0x5
	.uleb128 0
	.long	.LASF76
	.byte	0x5
	.uleb128 0
	.long	.LASF77
	.byte	0x5
	.uleb128 0
	.long	.LASF78
	.byte	0x5
	.uleb128 0
	.long	.LASF79
	.byte	0x5
	.uleb128 0
	.long	.LASF80
	.byte	0x5
	.uleb128 0
	.long	.LASF81
	.byte	0x5
	.uleb128 0
	.long	.LASF82
	.byte	0x5
	.uleb128 0
	.long	.LASF83
	.byte	0x5
	.uleb128 0
	.long	.LASF84
	.byte	0x5
	.uleb128 0
	.long	.LASF85
	.byte	0x5
	.uleb128 0
	.long	.LASF86
	.byte	0x5
	.uleb128 0
	.long	.LASF87
	.byte	0x5
	.uleb128 0
	.long	.LASF88
	.byte	0x5
	.uleb128 0
	.long	.LASF89
	.byte	0x5
	.uleb128 0
	.long	.LASF90
	.byte	0x5
	.uleb128 0
	.long	.LASF91
	.byte	0x5
	.uleb128 0
	.long	.LASF92
	.byte	0x5
	.uleb128 0
	.long	.LASF93
	.byte	0x5
	.uleb128 0
	.long	.LASF94
	.byte	0x5
	.uleb128 0
	.long	.LASF95
	.byte	0x5
	.uleb128 0
	.long	.LASF96
	.byte	0x5
	.uleb128 0
	.long	.LASF97
	.byte	0x5
	.uleb128 0
	.long	.LASF98
	.byte	0x5
	.uleb128 0
	.long	.LASF99
	.byte	0x5
	.uleb128 0
	.long	.LASF100
	.byte	0x5
	.uleb128 0
	.long	.LASF101
	.byte	0x5
	.uleb128 0
	.long	.LASF102
	.byte	0x5
	.uleb128 0
	.long	.LASF103
	.byte	0x5
	.uleb128 0
	.long	.LASF104
	.byte	0x5
	.uleb128 0
	.long	.LASF105
	.byte	0x5
	.uleb128 0
	.long	.LASF106
	.byte	0x5
	.uleb128 0
	.long	.LASF107
	.byte	0x5
	.uleb128 0
	.long	.LASF108
	.byte	0x5
	.uleb128 0
	.long	.LASF109
	.byte	0x5
	.uleb128 0
	.long	.LASF110
	.byte	0x5
	.uleb128 0
	.long	.LASF111
	.byte	0x5
	.uleb128 0
	.long	.LASF112
	.byte	0x5
	.uleb128 0
	.long	.LASF113
	.byte	0x5
	.uleb128 0
	.long	.LASF114
	.byte	0x5
	.uleb128 0
	.long	.LASF115
	.byte	0x5
	.uleb128 0
	.long	.LASF116
	.byte	0x5
	.uleb128 0
	.long	.LASF117
	.byte	0x5
	.uleb128 0
	.long	.LASF118
	.byte	0x5
	.uleb128 0
	.long	.LASF119
	.byte	0x5
	.uleb128 0
	.long	.LASF120
	.byte	0x5
	.uleb128 0
	.long	.LASF121
	.byte	0x5
	.uleb128 0
	.long	.LASF122
	.byte	0x5
	.uleb128 0
	.long	.LASF123
	.byte	0x5
	.uleb128 0
	.long	.LASF124
	.byte	0x5
	.uleb128 0
	.long	.LASF125
	.byte	0x5
	.uleb128 0
	.long	.LASF126
	.byte	0x5
	.uleb128 0
	.long	.LASF127
	.byte	0x5
	.uleb128 0
	.long	.LASF128
	.byte	0x5
	.uleb128 0
	.long	.LASF129
	.byte	0x5
	.uleb128 0
	.long	.LASF130
	.byte	0x5
	.uleb128 0
	.long	.LASF131
	.byte	0x5
	.uleb128 0
	.long	.LASF132
	.byte	0x5
	.uleb128 0
	.long	.LASF133
	.byte	0x5
	.uleb128 0
	.long	.LASF134
	.byte	0x5
	.uleb128 0
	.long	.LASF135
	.byte	0x5
	.uleb128 0
	.long	.LASF136
	.byte	0x5
	.uleb128 0
	.long	.LASF137
	.byte	0x5
	.uleb128 0
	.long	.LASF138
	.byte	0x5
	.uleb128 0
	.long	.LASF139
	.byte	0x5
	.uleb128 0
	.long	.LASF140
	.byte	0x5
	.uleb128 0
	.long	.LASF141
	.byte	0x5
	.uleb128 0
	.long	.LASF142
	.byte	0x5
	.uleb128 0
	.long	.LASF143
	.byte	0x5
	.uleb128 0
	.long	.LASF144
	.byte	0x5
	.uleb128 0
	.long	.LASF145
	.byte	0x5
	.uleb128 0
	.long	.LASF146
	.byte	0x5
	.uleb128 0
	.long	.LASF147
	.byte	0x5
	.uleb128 0
	.long	.LASF148
	.byte	0x5
	.uleb128 0
	.long	.LASF149
	.byte	0x5
	.uleb128 0
	.long	.LASF150
	.byte	0x5
	.uleb128 0
	.long	.LASF151
	.byte	0x5
	.uleb128 0
	.long	.LASF152
	.byte	0x5
	.uleb128 0
	.long	.LASF153
	.byte	0x5
	.uleb128 0
	.long	.LASF154
	.byte	0x5
	.uleb128 0
	.long	.LASF155
	.byte	0x5
	.uleb128 0
	.long	.LASF156
	.byte	0x5
	.uleb128 0
	.long	.LASF157
	.byte	0x5
	.uleb128 0
	.long	.LASF158
	.byte	0x5
	.uleb128 0
	.long	.LASF159
	.byte	0x5
	.uleb128 0
	.long	.LASF160
	.byte	0x5
	.uleb128 0
	.long	.LASF161
	.byte	0x5
	.uleb128 0
	.long	.LASF162
	.byte	0x5
	.uleb128 0
	.long	.LASF163
	.byte	0x5
	.uleb128 0
	.long	.LASF164
	.byte	0x5
	.uleb128 0
	.long	.LASF165
	.byte	0x5
	.uleb128 0
	.long	.LASF166
	.byte	0x5
	.uleb128 0
	.long	.LASF167
	.byte	0x5
	.uleb128 0
	.long	.LASF168
	.byte	0x5
	.uleb128 0
	.long	.LASF169
	.byte	0x5
	.uleb128 0
	.long	.LASF170
	.byte	0x5
	.uleb128 0
	.long	.LASF171
	.byte	0x5
	.uleb128 0
	.long	.LASF172
	.byte	0x5
	.uleb128 0
	.long	.LASF173
	.byte	0x5
	.uleb128 0
	.long	.LASF174
	.byte	0x5
	.uleb128 0
	.long	.LASF175
	.byte	0x5
	.uleb128 0
	.long	.LASF176
	.byte	0x5
	.uleb128 0
	.long	.LASF177
	.byte	0x5
	.uleb128 0
	.long	.LASF178
	.byte	0x5
	.uleb128 0
	.long	.LASF179
	.byte	0x5
	.uleb128 0
	.long	.LASF180
	.byte	0x5
	.uleb128 0
	.long	.LASF181
	.byte	0x5
	.uleb128 0
	.long	.LASF182
	.byte	0x5
	.uleb128 0
	.long	.LASF183
	.byte	0x5
	.uleb128 0
	.long	.LASF184
	.byte	0x5
	.uleb128 0
	.long	.LASF185
	.byte	0x5
	.uleb128 0
	.long	.LASF186
	.byte	0x5
	.uleb128 0
	.long	.LASF187
	.byte	0x5
	.uleb128 0
	.long	.LASF188
	.byte	0x5
	.uleb128 0
	.long	.LASF189
	.byte	0x5
	.uleb128 0
	.long	.LASF190
	.byte	0x5
	.uleb128 0
	.long	.LASF191
	.byte	0x5
	.uleb128 0
	.long	.LASF192
	.byte	0x5
	.uleb128 0
	.long	.LASF193
	.byte	0x5
	.uleb128 0
	.long	.LASF194
	.byte	0x5
	.uleb128 0
	.long	.LASF195
	.byte	0x5
	.uleb128 0
	.long	.LASF196
	.byte	0x5
	.uleb128 0
	.long	.LASF197
	.byte	0x5
	.uleb128 0
	.long	.LASF198
	.byte	0x5
	.uleb128 0
	.long	.LASF199
	.byte	0x5
	.uleb128 0
	.long	.LASF200
	.byte	0x5
	.uleb128 0
	.long	.LASF201
	.byte	0x5
	.uleb128 0
	.long	.LASF202
	.byte	0x5
	.uleb128 0
	.long	.LASF203
	.byte	0x5
	.uleb128 0
	.long	.LASF204
	.byte	0x5
	.uleb128 0
	.long	.LASF205
	.byte	0x5
	.uleb128 0
	.long	.LASF206
	.byte	0x5
	.uleb128 0
	.long	.LASF207
	.byte	0x5
	.uleb128 0
	.long	.LASF208
	.byte	0x5
	.uleb128 0
	.long	.LASF209
	.byte	0x5
	.uleb128 0
	.long	.LASF210
	.byte	0x5
	.uleb128 0
	.long	.LASF211
	.byte	0x5
	.uleb128 0
	.long	.LASF212
	.byte	0x5
	.uleb128 0
	.long	.LASF213
	.byte	0x5
	.uleb128 0
	.long	.LASF214
	.byte	0x5
	.uleb128 0
	.long	.LASF215
	.byte	0x5
	.uleb128 0
	.long	.LASF216
	.byte	0x5
	.uleb128 0
	.long	.LASF217
	.byte	0x5
	.uleb128 0
	.long	.LASF218
	.byte	0x5
	.uleb128 0
	.long	.LASF219
	.byte	0x5
	.uleb128 0
	.long	.LASF220
	.byte	0x5
	.uleb128 0
	.long	.LASF221
	.byte	0x5
	.uleb128 0
	.long	.LASF222
	.byte	0x5
	.uleb128 0
	.long	.LASF223
	.byte	0x5
	.uleb128 0
	.long	.LASF224
	.byte	0x5
	.uleb128 0
	.long	.LASF225
	.byte	0x5
	.uleb128 0
	.long	.LASF226
	.byte	0x5
	.uleb128 0
	.long	.LASF227
	.byte	0x5
	.uleb128 0
	.long	.LASF228
	.byte	0x5
	.uleb128 0
	.long	.LASF229
	.byte	0x5
	.uleb128 0
	.long	.LASF230
	.byte	0x5
	.uleb128 0
	.long	.LASF231
	.byte	0x5
	.uleb128 0
	.long	.LASF232
	.byte	0x5
	.uleb128 0
	.long	.LASF233
	.byte	0x5
	.uleb128 0
	.long	.LASF234
	.byte	0x5
	.uleb128 0
	.long	.LASF235
	.byte	0x5
	.uleb128 0
	.long	.LASF236
	.byte	0x5
	.uleb128 0
	.long	.LASF237
	.byte	0x5
	.uleb128 0
	.long	.LASF238
	.byte	0x5
	.uleb128 0
	.long	.LASF239
	.byte	0x5
	.uleb128 0
	.long	.LASF240
	.byte	0x5
	.uleb128 0
	.long	.LASF241
	.byte	0x5
	.uleb128 0
	.long	.LASF242
	.byte	0x5
	.uleb128 0
	.long	.LASF243
	.byte	0x5
	.uleb128 0
	.long	.LASF244
	.byte	0x5
	.uleb128 0
	.long	.LASF245
	.byte	0x5
	.uleb128 0
	.long	.LASF246
	.byte	0x5
	.uleb128 0
	.long	.LASF247
	.byte	0x5
	.uleb128 0
	.long	.LASF248
	.byte	0x5
	.uleb128 0
	.long	.LASF249
	.byte	0x5
	.uleb128 0
	.long	.LASF250
	.byte	0x5
	.uleb128 0
	.long	.LASF251
	.byte	0x5
	.uleb128 0
	.long	.LASF252
	.byte	0x5
	.uleb128 0
	.long	.LASF253
	.byte	0x5
	.uleb128 0
	.long	.LASF254
	.byte	0x5
	.uleb128 0
	.long	.LASF255
	.byte	0x5
	.uleb128 0
	.long	.LASF256
	.byte	0x5
	.uleb128 0
	.long	.LASF257
	.byte	0x5
	.uleb128 0
	.long	.LASF258
	.byte	0x5
	.uleb128 0
	.long	.LASF259
	.byte	0x5
	.uleb128 0
	.long	.LASF260
	.byte	0x5
	.uleb128 0
	.long	.LASF261
	.byte	0x5
	.uleb128 0
	.long	.LASF262
	.byte	0x5
	.uleb128 0
	.long	.LASF263
	.byte	0x5
	.uleb128 0
	.long	.LASF264
	.byte	0x5
	.uleb128 0
	.long	.LASF265
	.byte	0x5
	.uleb128 0
	.long	.LASF266
	.byte	0x5
	.uleb128 0
	.long	.LASF267
	.byte	0x5
	.uleb128 0
	.long	.LASF268
	.byte	0x5
	.uleb128 0
	.long	.LASF269
	.byte	0x5
	.uleb128 0
	.long	.LASF270
	.byte	0x5
	.uleb128 0
	.long	.LASF271
	.byte	0x5
	.uleb128 0
	.long	.LASF272
	.byte	0x5
	.uleb128 0
	.long	.LASF273
	.byte	0x5
	.uleb128 0
	.long	.LASF274
	.byte	0x5
	.uleb128 0
	.long	.LASF275
	.byte	0x5
	.uleb128 0
	.long	.LASF276
	.byte	0x5
	.uleb128 0
	.long	.LASF277
	.byte	0x5
	.uleb128 0
	.long	.LASF278
	.byte	0x5
	.uleb128 0
	.long	.LASF279
	.byte	0x5
	.uleb128 0
	.long	.LASF280
	.byte	0x5
	.uleb128 0
	.long	.LASF281
	.byte	0x5
	.uleb128 0
	.long	.LASF282
	.byte	0x5
	.uleb128 0
	.long	.LASF283
	.byte	0x5
	.uleb128 0
	.long	.LASF284
	.byte	0x5
	.uleb128 0
	.long	.LASF285
	.byte	0x5
	.uleb128 0
	.long	.LASF286
	.byte	0x5
	.uleb128 0
	.long	.LASF287
	.byte	0x5
	.uleb128 0
	.long	.LASF288
	.byte	0x5
	.uleb128 0
	.long	.LASF289
	.byte	0x5
	.uleb128 0
	.long	.LASF290
	.byte	0x5
	.uleb128 0
	.long	.LASF291
	.byte	0x5
	.uleb128 0
	.long	.LASF292
	.byte	0x5
	.uleb128 0
	.long	.LASF293
	.byte	0x5
	.uleb128 0
	.long	.LASF294
	.byte	0x5
	.uleb128 0
	.long	.LASF295
	.byte	0x5
	.uleb128 0
	.long	.LASF296
	.byte	0x5
	.uleb128 0
	.long	.LASF297
	.byte	0x5
	.uleb128 0
	.long	.LASF298
	.byte	0x5
	.uleb128 0
	.long	.LASF299
	.byte	0x5
	.uleb128 0
	.long	.LASF300
	.byte	0x5
	.uleb128 0
	.long	.LASF301
	.byte	0x5
	.uleb128 0
	.long	.LASF302
	.byte	0x5
	.uleb128 0
	.long	.LASF303
	.byte	0x5
	.uleb128 0
	.long	.LASF304
	.byte	0x5
	.uleb128 0
	.long	.LASF305
	.byte	0x5
	.uleb128 0
	.long	.LASF306
	.byte	0x5
	.uleb128 0
	.long	.LASF307
	.byte	0x5
	.uleb128 0
	.long	.LASF308
	.byte	0x5
	.uleb128 0
	.long	.LASF309
	.byte	0x5
	.uleb128 0
	.long	.LASF310
	.byte	0x5
	.uleb128 0
	.long	.LASF311
	.byte	0x5
	.uleb128 0
	.long	.LASF312
	.byte	0x5
	.uleb128 0
	.long	.LASF313
	.byte	0x5
	.uleb128 0
	.long	.LASF314
	.byte	0x5
	.uleb128 0
	.long	.LASF315
	.byte	0x5
	.uleb128 0
	.long	.LASF316
	.byte	0x5
	.uleb128 0
	.long	.LASF317
	.byte	0x5
	.uleb128 0
	.long	.LASF318
	.byte	0x5
	.uleb128 0
	.long	.LASF319
	.byte	0x5
	.uleb128 0
	.long	.LASF320
	.byte	0x5
	.uleb128 0
	.long	.LASF321
	.byte	0x5
	.uleb128 0
	.long	.LASF322
	.byte	0x5
	.uleb128 0
	.long	.LASF323
	.byte	0x5
	.uleb128 0
	.long	.LASF324
	.byte	0x5
	.uleb128 0
	.long	.LASF325
	.byte	0x5
	.uleb128 0
	.long	.LASF326
	.byte	0x5
	.uleb128 0
	.long	.LASF327
	.byte	0x5
	.uleb128 0
	.long	.LASF328
	.byte	0x5
	.uleb128 0
	.long	.LASF329
	.byte	0x5
	.uleb128 0
	.long	.LASF330
	.byte	0x5
	.uleb128 0
	.long	.LASF331
	.byte	0x5
	.uleb128 0
	.long	.LASF332
	.byte	0x5
	.uleb128 0
	.long	.LASF333
	.byte	0x5
	.uleb128 0
	.long	.LASF334
	.byte	0x5
	.uleb128 0
	.long	.LASF335
	.byte	0x5
	.uleb128 0
	.long	.LASF336
	.byte	0x5
	.uleb128 0
	.long	.LASF337
	.byte	0x5
	.uleb128 0
	.long	.LASF338
	.byte	0x5
	.uleb128 0
	.long	.LASF339
	.byte	0x5
	.uleb128 0
	.long	.LASF340
	.byte	0x5
	.uleb128 0
	.long	.LASF341
	.byte	0x5
	.uleb128 0
	.long	.LASF342
	.byte	0x5
	.uleb128 0
	.long	.LASF343
	.byte	0x5
	.uleb128 0
	.long	.LASF344
	.byte	0x5
	.uleb128 0
	.long	.LASF345
	.byte	0x5
	.uleb128 0
	.long	.LASF346
	.byte	0x5
	.uleb128 0
	.long	.LASF347
	.byte	0x5
	.uleb128 0
	.long	.LASF348
	.byte	0x5
	.uleb128 0
	.long	.LASF349
	.byte	0x5
	.uleb128 0
	.long	.LASF350
	.byte	0x5
	.uleb128 0
	.long	.LASF351
	.byte	0x5
	.uleb128 0
	.long	.LASF352
	.byte	0x5
	.uleb128 0
	.long	.LASF353
	.byte	0x5
	.uleb128 0
	.long	.LASF354
	.byte	0x5
	.uleb128 0
	.long	.LASF355
	.byte	0x5
	.uleb128 0
	.long	.LASF356
	.byte	0x5
	.uleb128 0
	.long	.LASF357
	.byte	0x5
	.uleb128 0
	.long	.LASF358
	.byte	0x5
	.uleb128 0
	.long	.LASF359
	.byte	0x5
	.uleb128 0
	.long	.LASF360
	.byte	0x5
	.uleb128 0
	.long	.LASF361
	.byte	0x5
	.uleb128 0
	.long	.LASF362
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.stdcpredef.h.19.88fdbfd5cf6f83ed579effc3e425f09b,comdat
.Ldebug_macro3:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x13
	.long	.LASF363
	.byte	0x5
	.uleb128 0x26
	.long	.LASF364
	.byte	0x5
	.uleb128 0x27
	.long	.LASF365
	.byte	0x5
	.uleb128 0x30
	.long	.LASF366
	.byte	0x5
	.uleb128 0x31
	.long	.LASF367
	.byte	0x5
	.uleb128 0x3e
	.long	.LASF368
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.stdio.h.24.5c1b97eef3c86b7a2549420f69f4f128,comdat
.Ldebug_macro4:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x18
	.long	.LASF369
	.byte	0x5
	.uleb128 0x1a
	.long	.LASF370
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.features.h.19.94fa84bfdc4fa1f32c117154c6101507,comdat
.Ldebug_macro5:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x13
	.long	.LASF372
	.byte	0x6
	.uleb128 0x7e
	.long	.LASF373
	.byte	0x6
	.uleb128 0x7f
	.long	.LASF374
	.byte	0x6
	.uleb128 0x80
	.long	.LASF375
	.byte	0x6
	.uleb128 0x81
	.long	.LASF376
	.byte	0x6
	.uleb128 0x82
	.long	.LASF377
	.byte	0x6
	.uleb128 0x83
	.long	.LASF378
	.byte	0x6
	.uleb128 0x84
	.long	.LASF379
	.byte	0x6
	.uleb128 0x85
	.long	.LASF380
	.byte	0x6
	.uleb128 0x86
	.long	.LASF381
	.byte	0x6
	.uleb128 0x87
	.long	.LASF382
	.byte	0x6
	.uleb128 0x88
	.long	.LASF383
	.byte	0x6
	.uleb128 0x89
	.long	.LASF384
	.byte	0x6
	.uleb128 0x8a
	.long	.LASF385
	.byte	0x6
	.uleb128 0x8b
	.long	.LASF386
	.byte	0x6
	.uleb128 0x8c
	.long	.LASF387
	.byte	0x6
	.uleb128 0x8d
	.long	.LASF388
	.byte	0x6
	.uleb128 0x8e
	.long	.LASF389
	.byte	0x6
	.uleb128 0x8f
	.long	.LASF390
	.byte	0x6
	.uleb128 0x90
	.long	.LASF391
	.byte	0x6
	.uleb128 0x91
	.long	.LASF392
	.byte	0x6
	.uleb128 0x92
	.long	.LASF393
	.byte	0x6
	.uleb128 0x93
	.long	.LASF394
	.byte	0x6
	.uleb128 0x94
	.long	.LASF395
	.byte	0x6
	.uleb128 0x95
	.long	.LASF396
	.byte	0x6
	.uleb128 0x96
	.long	.LASF397
	.byte	0x6
	.uleb128 0x97
	.long	.LASF398
	.byte	0x6
	.uleb128 0x98
	.long	.LASF399
	.byte	0x5
	.uleb128 0x9d
	.long	.LASF400
	.byte	0x5
	.uleb128 0xa8
	.long	.LASF401
	.byte	0x5
	.uleb128 0xb6
	.long	.LASF402
	.byte	0x5
	.uleb128 0xba
	.long	.LASF403
	.byte	0x6
	.uleb128 0xeb
	.long	.LASF404
	.byte	0x5
	.uleb128 0xec
	.long	.LASF405
	.byte	0x5
	.uleb128 0xf4
	.long	.LASF406
	.byte	0x5
	.uleb128 0xfa
	.long	.LASF407
	.byte	0x5
	.uleb128 0x101
	.long	.LASF408
	.byte	0x5
	.uleb128 0x108
	.long	.LASF409
	.byte	0x5
	.uleb128 0x11d
	.long	.LASF410
	.byte	0x6
	.uleb128 0x11f
	.long	.LASF411
	.byte	0x5
	.uleb128 0x120
	.long	.LASF412
	.byte	0x6
	.uleb128 0x121
	.long	.LASF413
	.byte	0x5
	.uleb128 0x122
	.long	.LASF414
	.byte	0x5
	.uleb128 0x145
	.long	.LASF415
	.byte	0x5
	.uleb128 0x149
	.long	.LASF416
	.byte	0x5
	.uleb128 0x14d
	.long	.LASF417
	.byte	0x5
	.uleb128 0x151
	.long	.LASF418
	.byte	0x5
	.uleb128 0x155
	.long	.LASF419
	.byte	0x6
	.uleb128 0x156
	.long	.LASF375
	.byte	0x5
	.uleb128 0x157
	.long	.LASF409
	.byte	0x6
	.uleb128 0x158
	.long	.LASF374
	.byte	0x5
	.uleb128 0x159
	.long	.LASF408
	.byte	0x5
	.uleb128 0x15d
	.long	.LASF420
	.byte	0x6
	.uleb128 0x15e
	.long	.LASF421
	.byte	0x5
	.uleb128 0x15f
	.long	.LASF422
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.wordsize.h.4.baf119258a1e53d8dba67ceac44ab6bc,comdat
.Ldebug_macro6:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x4
	.long	.LASF423
	.byte	0x5
	.uleb128 0xc
	.long	.LASF424
	.byte	0x5
	.uleb128 0xe
	.long	.LASF425
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.features.h.395.e2af5c05e8a4fd5a2d004043e21657e0,comdat
.Ldebug_macro7:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x18b
	.long	.LASF427
	.byte	0x5
	.uleb128 0x18f
	.long	.LASF428
	.byte	0x5
	.uleb128 0x1ac
	.long	.LASF429
	.byte	0x5
	.uleb128 0x1b4
	.long	.LASF430
	.byte	0x5
	.uleb128 0x1cb
	.long	.LASF431
	.byte	0x6
	.uleb128 0x1d8
	.long	.LASF432
	.byte	0x5
	.uleb128 0x1d9
	.long	.LASF433
	.byte	0x5
	.uleb128 0x1dd
	.long	.LASF434
	.byte	0x5
	.uleb128 0x1de
	.long	.LASF435
	.byte	0x5
	.uleb128 0x1e0
	.long	.LASF436
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.cdefs.h.20.49c9437adba4cb37cdb1b4e91d72989f,comdat
.Ldebug_macro8:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x14
	.long	.LASF437
	.byte	0x2
	.uleb128 0x23
	.string	"__P"
	.byte	0x6
	.uleb128 0x24
	.long	.LASF438
	.byte	0x5
	.uleb128 0x2d
	.long	.LASF439
	.byte	0x5
	.uleb128 0x32
	.long	.LASF440
	.byte	0x5
	.uleb128 0x39
	.long	.LASF441
	.byte	0x5
	.uleb128 0x41
	.long	.LASF442
	.byte	0x5
	.uleb128 0x42
	.long	.LASF443
	.byte	0x5
	.uleb128 0x4f
	.long	.LASF444
	.byte	0x5
	.uleb128 0x50
	.long	.LASF445
	.byte	0x5
	.uleb128 0x51
	.long	.LASF446
	.byte	0x5
	.uleb128 0x52
	.long	.LASF447
	.byte	0x5
	.uleb128 0x76
	.long	.LASF448
	.byte	0x5
	.uleb128 0x77
	.long	.LASF449
	.byte	0x5
	.uleb128 0x7c
	.long	.LASF450
	.byte	0x5
	.uleb128 0x7d
	.long	.LASF451
	.byte	0x5
	.uleb128 0x80
	.long	.LASF452
	.byte	0x5
	.uleb128 0x88
	.long	.LASF453
	.byte	0x5
	.uleb128 0x89
	.long	.LASF454
	.byte	0x5
	.uleb128 0x8e
	.long	.LASF455
	.byte	0x5
	.uleb128 0x8f
	.long	.LASF456
	.byte	0x5
	.uleb128 0x97
	.long	.LASF457
	.byte	0x5
	.uleb128 0x98
	.long	.LASF458
	.byte	0x5
	.uleb128 0x9f
	.long	.LASF459
	.byte	0x5
	.uleb128 0xa0
	.long	.LASF460
	.byte	0x5
	.uleb128 0xa7
	.long	.LASF461
	.byte	0x5
	.uleb128 0xb0
	.long	.LASF462
	.byte	0x5
	.uleb128 0xb9
	.long	.LASF463
	.byte	0x5
	.uleb128 0xc3
	.long	.LASF464
	.byte	0x5
	.uleb128 0xcb
	.long	.LASF465
	.byte	0x5
	.uleb128 0xcc
	.long	.LASF466
	.byte	0x5
	.uleb128 0xd8
	.long	.LASF467
	.byte	0x5
	.uleb128 0xd9
	.long	.LASF468
	.byte	0x5
	.uleb128 0xf7
	.long	.LASF469
	.byte	0x5
	.uleb128 0xfe
	.long	.LASF470
	.byte	0x5
	.uleb128 0x100
	.long	.LASF471
	.byte	0x5
	.uleb128 0x103
	.long	.LASF472
	.byte	0x5
	.uleb128 0x104
	.long	.LASF473
	.byte	0x5
	.uleb128 0x119
	.long	.LASF474
	.byte	0x5
	.uleb128 0x121
	.long	.LASF475
	.byte	0x5
	.uleb128 0x12a
	.long	.LASF476
	.byte	0x5
	.uleb128 0x134
	.long	.LASF477
	.byte	0x5
	.uleb128 0x13b
	.long	.LASF478
	.byte	0x5
	.uleb128 0x141
	.long	.LASF479
	.byte	0x5
	.uleb128 0x14a
	.long	.LASF480
	.byte	0x5
	.uleb128 0x14b
	.long	.LASF481
	.byte	0x5
	.uleb128 0x153
	.long	.LASF482
	.byte	0x5
	.uleb128 0x15d
	.long	.LASF483
	.byte	0x5
	.uleb128 0x16a
	.long	.LASF484
	.byte	0x5
	.uleb128 0x174
	.long	.LASF485
	.byte	0x5
	.uleb128 0x180
	.long	.LASF486
	.byte	0x5
	.uleb128 0x186
	.long	.LASF487
	.byte	0x5
	.uleb128 0x18d
	.long	.LASF488
	.byte	0x5
	.uleb128 0x196
	.long	.LASF489
	.byte	0x5
	.uleb128 0x19f
	.long	.LASF490
	.byte	0x6
	.uleb128 0x1a7
	.long	.LASF491
	.byte	0x5
	.uleb128 0x1a8
	.long	.LASF492
	.byte	0x5
	.uleb128 0x1b1
	.long	.LASF493
	.byte	0x5
	.uleb128 0x1c3
	.long	.LASF494
	.byte	0x5
	.uleb128 0x1c4
	.long	.LASF495
	.byte	0x5
	.uleb128 0x1cd
	.long	.LASF496
	.byte	0x5
	.uleb128 0x1d3
	.long	.LASF497
	.byte	0x5
	.uleb128 0x1d4
	.long	.LASF498
	.byte	0x5
	.uleb128 0x1ef
	.long	.LASF499
	.byte	0x5
	.uleb128 0x1fe
	.long	.LASF500
	.byte	0x5
	.uleb128 0x1ff
	.long	.LASF501
	.byte	0x5
	.uleb128 0x214
	.long	.LASF502
	.byte	0x6
	.uleb128 0x21a
	.long	.LASF503
	.byte	0x5
	.uleb128 0x21e
	.long	.LASF504
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.cdefs.h.616.8d7ca1b9d01e52f5b2c040c19a111f7b,comdat
.Ldebug_macro9:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x268
	.long	.LASF506
	.byte	0x5
	.uleb128 0x269
	.long	.LASF507
	.byte	0x5
	.uleb128 0x26a
	.long	.LASF508
	.byte	0x5
	.uleb128 0x26b
	.long	.LASF509
	.byte	0x5
	.uleb128 0x26c
	.long	.LASF510
	.byte	0x5
	.uleb128 0x26d
	.long	.LASF511
	.byte	0x5
	.uleb128 0x26f
	.long	.LASF512
	.byte	0x5
	.uleb128 0x270
	.long	.LASF513
	.byte	0x5
	.uleb128 0x27b
	.long	.LASF514
	.byte	0x5
	.uleb128 0x27c
	.long	.LASF515
	.byte	0x5
	.uleb128 0x28e
	.long	.LASF516
	.byte	0x5
	.uleb128 0x299
	.long	.LASF517
	.byte	0x5
	.uleb128 0x2a1
	.long	.LASF518
	.byte	0x5
	.uleb128 0x2a4
	.long	.LASF519
	.byte	0x5
	.uleb128 0x2b1
	.long	.LASF520
	.byte	0x5
	.uleb128 0x2b3
	.long	.LASF521
	.byte	0x5
	.uleb128 0x2bc
	.long	.LASF522
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.stubs64.h.10.7865f4f7062bab1c535c1f73f43aa9b9,comdat
.Ldebug_macro10:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0xa
	.long	.LASF523
	.byte	0x5
	.uleb128 0xb
	.long	.LASF524
	.byte	0x5
	.uleb128 0xc
	.long	.LASF525
	.byte	0x5
	.uleb128 0xd
	.long	.LASF526
	.byte	0x5
	.uleb128 0xe
	.long	.LASF527
	.byte	0x5
	.uleb128 0xf
	.long	.LASF528
	.byte	0x5
	.uleb128 0x10
	.long	.LASF529
	.byte	0x5
	.uleb128 0x11
	.long	.LASF530
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.libcheaderstart.h.37.e7d4b6f4649b40d3e0dce357ae78234f,comdat
.Ldebug_macro11:
	.value	0x5
	.byte	0
	.byte	0x6
	.uleb128 0x25
	.long	.LASF531
	.byte	0x5
	.uleb128 0x2a
	.long	.LASF532
	.byte	0x6
	.uleb128 0x43
	.long	.LASF533
	.byte	0x5
	.uleb128 0x47
	.long	.LASF534
	.byte	0x6
	.uleb128 0x49
	.long	.LASF535
	.byte	0x5
	.uleb128 0x4d
	.long	.LASF536
	.byte	0x6
	.uleb128 0x4f
	.long	.LASF537
	.byte	0x5
	.uleb128 0x53
	.long	.LASF538
	.byte	0x6
	.uleb128 0x5a
	.long	.LASF539
	.byte	0x5
	.uleb128 0x5e
	.long	.LASF540
	.byte	0x6
	.uleb128 0x60
	.long	.LASF541
	.byte	0x5
	.uleb128 0x64
	.long	.LASF542
	.byte	0x6
	.uleb128 0x69
	.long	.LASF543
	.byte	0x5
	.uleb128 0x6d
	.long	.LASF544
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.stdio.h.31.e39a94e203ad4e1d978c0fc68ce016ee,comdat
.Ldebug_macro12:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x1f
	.long	.LASF545
	.byte	0x5
	.uleb128 0x20
	.long	.LASF546
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.stddef.h.181.c3f52a3b0f4c288bddb5dda1562858e2,comdat
.Ldebug_macro13:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0xb5
	.long	.LASF547
	.byte	0x5
	.uleb128 0xb6
	.long	.LASF548
	.byte	0x5
	.uleb128 0xb7
	.long	.LASF549
	.byte	0x5
	.uleb128 0xb8
	.long	.LASF550
	.byte	0x5
	.uleb128 0xb9
	.long	.LASF551
	.byte	0x5
	.uleb128 0xba
	.long	.LASF552
	.byte	0x5
	.uleb128 0xbb
	.long	.LASF553
	.byte	0x5
	.uleb128 0xbc
	.long	.LASF554
	.byte	0x5
	.uleb128 0xbd
	.long	.LASF555
	.byte	0x5
	.uleb128 0xbe
	.long	.LASF556
	.byte	0x5
	.uleb128 0xbf
	.long	.LASF557
	.byte	0x5
	.uleb128 0xc0
	.long	.LASF558
	.byte	0x5
	.uleb128 0xc1
	.long	.LASF559
	.byte	0x5
	.uleb128 0xc2
	.long	.LASF560
	.byte	0x5
	.uleb128 0xc3
	.long	.LASF561
	.byte	0x5
	.uleb128 0xc4
	.long	.LASF562
	.byte	0x5
	.uleb128 0xcb
	.long	.LASF563
	.byte	0x6
	.uleb128 0xe7
	.long	.LASF564
	.byte	0x6
	.uleb128 0x186
	.long	.LASF565
	.byte	0x5
	.uleb128 0x18b
	.long	.LASF566
	.byte	0x6
	.uleb128 0x191
	.long	.LASF567
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.stdarg.h.34.3a23a216c0c293b3d2ea2e89281481e6,comdat
.Ldebug_macro14:
	.value	0x5
	.byte	0
	.byte	0x6
	.uleb128 0x22
	.long	.LASF569
	.byte	0x5
	.uleb128 0x27
	.long	.LASF570
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.types.h.109.56eb9ae966b255288cc544f18746a7ff,comdat
.Ldebug_macro15:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x6d
	.long	.LASF572
	.byte	0x5
	.uleb128 0x6e
	.long	.LASF573
	.byte	0x5
	.uleb128 0x6f
	.long	.LASF574
	.byte	0x5
	.uleb128 0x70
	.long	.LASF575
	.byte	0x5
	.uleb128 0x71
	.long	.LASF576
	.byte	0x5
	.uleb128 0x72
	.long	.LASF577
	.byte	0x5
	.uleb128 0x80
	.long	.LASF578
	.byte	0x5
	.uleb128 0x81
	.long	.LASF579
	.byte	0x5
	.uleb128 0x82
	.long	.LASF580
	.byte	0x5
	.uleb128 0x83
	.long	.LASF581
	.byte	0x5
	.uleb128 0x84
	.long	.LASF582
	.byte	0x5
	.uleb128 0x85
	.long	.LASF583
	.byte	0x5
	.uleb128 0x86
	.long	.LASF584
	.byte	0x5
	.uleb128 0x87
	.long	.LASF585
	.byte	0x5
	.uleb128 0x89
	.long	.LASF586
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.typesizes.h.24.ccf5919b8e01b553263cf8f4ab1d5fde,comdat
.Ldebug_macro16:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x18
	.long	.LASF587
	.byte	0x5
	.uleb128 0x22
	.long	.LASF588
	.byte	0x5
	.uleb128 0x23
	.long	.LASF589
	.byte	0x5
	.uleb128 0x26
	.long	.LASF590
	.byte	0x5
	.uleb128 0x27
	.long	.LASF591
	.byte	0x5
	.uleb128 0x28
	.long	.LASF592
	.byte	0x5
	.uleb128 0x29
	.long	.LASF593
	.byte	0x5
	.uleb128 0x2a
	.long	.LASF594
	.byte	0x5
	.uleb128 0x2b
	.long	.LASF595
	.byte	0x5
	.uleb128 0x2d
	.long	.LASF596
	.byte	0x5
	.uleb128 0x2e
	.long	.LASF597
	.byte	0x5
	.uleb128 0x33
	.long	.LASF598
	.byte	0x5
	.uleb128 0x34
	.long	.LASF599
	.byte	0x5
	.uleb128 0x35
	.long	.LASF600
	.byte	0x5
	.uleb128 0x36
	.long	.LASF601
	.byte	0x5
	.uleb128 0x37
	.long	.LASF602
	.byte	0x5
	.uleb128 0x38
	.long	.LASF603
	.byte	0x5
	.uleb128 0x39
	.long	.LASF604
	.byte	0x5
	.uleb128 0x3a
	.long	.LASF605
	.byte	0x5
	.uleb128 0x3b
	.long	.LASF606
	.byte	0x5
	.uleb128 0x3c
	.long	.LASF607
	.byte	0x5
	.uleb128 0x3d
	.long	.LASF608
	.byte	0x5
	.uleb128 0x3e
	.long	.LASF609
	.byte	0x5
	.uleb128 0x3f
	.long	.LASF610
	.byte	0x5
	.uleb128 0x40
	.long	.LASF611
	.byte	0x5
	.uleb128 0x41
	.long	.LASF612
	.byte	0x5
	.uleb128 0x42
	.long	.LASF613
	.byte	0x5
	.uleb128 0x43
	.long	.LASF614
	.byte	0x5
	.uleb128 0x44
	.long	.LASF615
	.byte	0x5
	.uleb128 0x45
	.long	.LASF616
	.byte	0x5
	.uleb128 0x46
	.long	.LASF617
	.byte	0x5
	.uleb128 0x47
	.long	.LASF618
	.byte	0x5
	.uleb128 0x48
	.long	.LASF619
	.byte	0x5
	.uleb128 0x49
	.long	.LASF620
	.byte	0x5
	.uleb128 0x4a
	.long	.LASF621
	.byte	0x5
	.uleb128 0x4b
	.long	.LASF622
	.byte	0x5
	.uleb128 0x51
	.long	.LASF623
	.byte	0x5
	.uleb128 0x54
	.long	.LASF624
	.byte	0x5
	.uleb128 0x57
	.long	.LASF625
	.byte	0x5
	.uleb128 0x5a
	.long	.LASF626
	.byte	0x5
	.uleb128 0x5d
	.long	.LASF627
	.byte	0x5
	.uleb128 0x67
	.long	.LASF628
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.time64.h.24.a8166ae916ec910dab0d8987098d42ee,comdat
.Ldebug_macro17:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x18
	.long	.LASF629
	.byte	0x5
	.uleb128 0x1e
	.long	.LASF630
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.struct_FILE.h.19.0888ac70396abe1031c03d393554032f,comdat
.Ldebug_macro18:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x13
	.long	.LASF637
	.byte	0x5
	.uleb128 0x66
	.long	.LASF638
	.byte	0x5
	.uleb128 0x6a
	.long	.LASF639
	.byte	0x5
	.uleb128 0x6f
	.long	.LASF640
	.byte	0x5
	.uleb128 0x70
	.long	.LASF641
	.byte	0x5
	.uleb128 0x72
	.long	.LASF642
	.byte	0x5
	.uleb128 0x73
	.long	.LASF643
	.byte	0x5
	.uleb128 0x75
	.long	.LASF644
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.stdio.h.53.78a7f18f3bc87ded52f05aa6f6a64310,comdat
.Ldebug_macro19:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x35
	.long	.LASF645
	.byte	0x5
	.uleb128 0x43
	.long	.LASF646
	.byte	0x5
	.uleb128 0x4e
	.long	.LASF647
	.byte	0x5
	.uleb128 0x5d
	.long	.LASF648
	.byte	0x5
	.uleb128 0x5e
	.long	.LASF649
	.byte	0x5
	.uleb128 0x5f
	.long	.LASF650
	.byte	0x5
	.uleb128 0x63
	.long	.LASF651
	.byte	0x5
	.uleb128 0x68
	.long	.LASF652
	.byte	0x5
	.uleb128 0x6d
	.long	.LASF653
	.byte	0x5
	.uleb128 0x6e
	.long	.LASF654
	.byte	0x5
	.uleb128 0x6f
	.long	.LASF655
	.byte	0x5
	.uleb128 0x78
	.long	.LASF656
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.stdio_lim.h.19.e4b00b560d878dcfbc6635b3406640c5,comdat
.Ldebug_macro20:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x13
	.long	.LASF657
	.byte	0x5
	.uleb128 0x19
	.long	.LASF658
	.byte	0x5
	.uleb128 0x1a
	.long	.LASF659
	.byte	0x5
	.uleb128 0x1b
	.long	.LASF660
	.byte	0x5
	.uleb128 0x1e
	.long	.LASF661
	.byte	0x6
	.uleb128 0x24
	.long	.LASF662
	.byte	0x5
	.uleb128 0x25
	.long	.LASF663
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.stdio.h.147.dbd603e98db8f3e1583090fab2abd54e,comdat
.Ldebug_macro21:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x93
	.long	.LASF664
	.byte	0x5
	.uleb128 0x94
	.long	.LASF665
	.byte	0x5
	.uleb128 0x95
	.long	.LASF666
	.byte	0x6
	.uleb128 0xb4
	.long	.LASF667
	.byte	0x5
	.uleb128 0xb5
	.long	.LASF668
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.floatn.h.20.a55feb25f1f7464b830caad4873a8713,comdat
.Ldebug_macro22:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x14
	.long	.LASF669
	.byte	0x5
	.uleb128 0x20
	.long	.LASF670
	.byte	0x5
	.uleb128 0x28
	.long	.LASF671
	.byte	0x5
	.uleb128 0x30
	.long	.LASF672
	.byte	0x5
	.uleb128 0x36
	.long	.LASF673
	.byte	0x5
	.uleb128 0x41
	.long	.LASF674
	.byte	0x5
	.uleb128 0x4d
	.long	.LASF675
	.byte	0
	.section	.debug_macro,"G",@progbits,wm4.floatncommon.h.34.7e1840d7dfb19e9bdb51aeb077d76637,comdat
.Ldebug_macro23:
	.value	0x5
	.byte	0
	.byte	0x5
	.uleb128 0x22
	.long	.LASF677
	.byte	0x5
	.uleb128 0x23
	.long	.LASF678
	.byte	0x5
	.uleb128 0x24
	.long	.LASF679
	.byte	0x5
	.uleb128 0x25
	.long	.LASF680
	.byte	0x5
	.uleb128 0x26
	.long	.LASF681
	.byte	0x5
	.uleb128 0x34
	.long	.LASF682
	.byte	0x5
	.uleb128 0x35
	.long	.LASF683
	.byte	0x5
	.uleb128 0x36
	.long	.LASF684
	.byte	0x5
	.uleb128 0x37
	.long	.LASF685
	.byte	0x5
	.uleb128 0x38
	.long	.LASF686
	.byte	0x5
	.uleb128 0x39
	.long	.LASF687
	.byte	0x5
	.uleb128 0x3f
	.long	.LASF688
	.byte	0x5
	.uleb128 0x46
	.long	.LASF689
	.byte	0x5
	.uleb128 0x5d
	.long	.LASF690
	.byte	0x5
	.uleb128 0x69
	.long	.LASF691
	.byte	0x5
	.uleb128 0x71
	.long	.LASF692
	.byte	0x5
	.uleb128 0x7d
	.long	.LASF693
	.byte	0x5
	.uleb128 0x97
	.long	.LASF694
	.byte	0x5
	.uleb128 0xa3
	.long	.LASF695
	.byte	0x5
	.uleb128 0xab
	.long	.LASF696
	.byte	0x5
	.uleb128 0xb7
	.long	.LASF697
	.byte	0
	.section	.debug_line,"",@progbits
.Ldebug_line0:
	.section	.debug_str,"MS",@progbits,1
.LASF667:
	.string	"__attr_dealloc_fclose"
.LASF554:
	.string	"_SIZE_T_ "
.LASF103:
	.string	"__SIG_ATOMIC_MAX__ 0x7fffffff"
.LASF234:
	.string	"__FLT64_HAS_QUIET_NAN__ 1"
.LASF557:
	.string	"_SIZE_T_DEFINED "
.LASF635:
	.string	"____FILE_defined 1"
.LASF195:
	.string	"__LDBL_MAX__ 1.18973149535723176502126385303097021e+4932L"
.LASF217:
	.string	"__FLT32_HAS_INFINITY__ 1"
.LASF224:
	.string	"__FLT64_MAX_EXP__ 1024"
.LASF158:
	.string	"__FLT_MIN_10_EXP__ (-37)"
.LASF589:
	.string	"__SYSCALL_ULONG_TYPE __ULONGWORD_TYPE"
.LASF278:
	.string	"__FLT64X_EPSILON__ 1.08420217248550443400745280086994171e-19F64x"
.LASF256:
	.string	"__FLT32X_MAX_EXP__ 1024"
.LASF430:
	.string	"__GLIBC_USE_DEPRECATED_GETS 0"
.LASF322:
	.string	"__GCC_ATOMIC_TEST_AND_SET_TRUEVAL 1"
.LASF623:
	.string	"__OFF_T_MATCHES_OFF64_T 1"
.LASF296:
	.string	"__DEC64_EPSILON__ 1E-15DD"
.LASF182:
	.string	"__DBL_DENORM_MIN__ ((double)4.94065645841246544176568792868221372e-324L)"
.LASF146:
	.string	"__INTPTR_MAX__ 0x7fffffffffffffffL"
.LASF467:
	.string	"__flexarr []"
.LASF204:
	.string	"__FLT32_MANT_DIG__ 24"
.LASF537:
	.string	"__GLIBC_USE_IEC_60559_EXT"
.LASF312:
	.string	"__GCC_HAVE_SYNC_COMPARE_AND_SWAP_8 1"
.LASF464:
	.ascii	"__glibc_"
	.string	"fortify_n(f,__l,__s,__osz,...) (__glibc_safe_or_unknown_len (__l, __s, __osz) ? __ ## f ## _alias (__VA_ARGS__) : (__glibc_unsafe_len (__l, __s, __osz) ? __ ## f ## _chk_warn (__VA_ARGS__, (__osz) / (__s)) : __ ## f ## _chk (__VA_ARGS__, (__osz) / (__s))))"
.LASF493:
	.string	"__attribute_artificial__ __attribute__ ((__artificial__))"
.LASF407:
	.string	"__USE_ISOC11 1"
.LASF474:
	.string	"__attribute_malloc__ __attribute__ ((__malloc__))"
.LASF654:
	.string	"SEEK_CUR 1"
.LASF258:
	.string	"__FLT32X_DECIMAL_DIG__ 17"
.LASF342:
	.string	"__k8__ 1"
.LASF173:
	.string	"__DBL_MIN_EXP__ (-1021)"
.LASF140:
	.string	"__INT_FAST64_MAX__ 0x7fffffffffffffffL"
.LASF315:
	.string	"__GCC_ATOMIC_CHAR16_T_LOCK_FREE 2"
.LASF665:
	.string	"stdout stdout"
.LASF694:
	.string	"__CFLOAT32 _Complex _Float32"
.LASF437:
	.string	"_SYS_CDEFS_H 1"
.LASF259:
	.string	"__FLT32X_MAX__ 1.79769313486231570814527423731704357e+308F32x"
.LASF500:
	.string	"__glibc_unlikely(cond) __builtin_expect ((cond), 0)"
.LASF330:
	.string	"__SIZEOF_WINT_T__ 4"
.LASF401:
	.string	"__GNUC_PREREQ(maj,min) ((__GNUC__ << 16) + __GNUC_MINOR__ >= ((maj) << 16) + (min))"
.LASF148:
	.string	"__UINTPTR_MAX__ 0xffffffffffffffffUL"
.LASF549:
	.string	"_SIZE_T "
.LASF498:
	.string	"__va_arg_pack_len() __builtin_va_arg_pack_len ()"
.LASF478:
	.string	"__attribute_const__ __attribute__ ((__const__))"
.LASF398:
	.string	"__GLIBC_USE_DEPRECATED_GETS"
.LASF212:
	.string	"__FLT32_NORM_MAX__ 3.40282346638528859811704183484516925e+38F32"
.LASF8:
	.string	"__GNUC_MINOR__ 4"
.LASF535:
	.string	"__GLIBC_USE_IEC_60559_BFP_EXT_C2X"
.LASF507:
	.string	"__LDBL_REDIR(name,proto) name proto"
.LASF49:
	.string	"__CHAR32_TYPE__ unsigned int"
.LASF700:
	.string	"unsigned int"
.LASF436:
	.string	"__GLIBC_PREREQ(maj,min) ((__GLIBC__ << 16) + __GLIBC_MINOR__ >= ((maj) << 16) + (min))"
.LASF546:
	.string	"__need_NULL "
.LASF229:
	.string	"__FLT64_MIN__ 2.22507385850720138309023271733240406e-308F64"
.LASF93:
	.string	"__LONG_LONG_WIDTH__ 64"
.LASF411:
	.string	"_POSIX_SOURCE"
.LASF166:
	.string	"__FLT_DENORM_MIN__ 1.40129846432481707092372958328991613e-45F"
.LASF48:
	.string	"__CHAR16_TYPE__ short unsigned int"
.LASF31:
	.string	"__SIZEOF_SIZE_T__ 8"
.LASF465:
	.string	"__warnattr(msg) __attribute__((__warning__ (msg)))"
.LASF35:
	.string	"__ORDER_BIG_ENDIAN__ 4321"
.LASF648:
	.string	"_IOFBF 0"
.LASF301:
	.string	"__DEC128_MIN__ 1E-6143DL"
.LASF428:
	.string	"__USE_ATFILE 1"
.LASF133:
	.string	"__UINT64_C(c) c ## UL"
.LASF432:
	.string	"__GNU_LIBRARY__"
.LASF171:
	.string	"__DBL_MANT_DIG__ 53"
.LASF169:
	.string	"__FLT_HAS_QUIET_NAN__ 1"
.LASF524:
	.string	"__stub_chflags "
.LASF80:
	.string	"__INT_MAX__ 0x7fffffff"
.LASF14:
	.string	"__ATOMIC_RELEASE 3"
.LASF170:
	.string	"__FLT_IS_IEC_60559__ 2"
.LASF525:
	.string	"__stub_fchflags "
.LASF52:
	.string	"__INT16_TYPE__ short int"
.LASF362:
	.string	"__DECIMAL_BID_FORMAT__ 1"
.LASF289:
	.string	"__DEC32_EPSILON__ 1E-6DF"
.LASF559:
	.string	"_SIZE_T_DECLARED "
.LASF457:
	.string	"__glibc_objsize0(__o) __bos0 (__o)"
.LASF188:
	.string	"__LDBL_DIG__ 18"
.LASF272:
	.string	"__FLT64X_MAX_EXP__ 16384"
.LASF12:
	.string	"__ATOMIC_SEQ_CST 5"
.LASF416:
	.string	"__USE_POSIX2 1"
.LASF409:
	.string	"__USE_ISOC95 1"
.LASF630:
	.string	"__TIME64_T_TYPE __TIME_T_TYPE"
.LASF27:
	.string	"__SIZEOF_SHORT__ 2"
.LASF542:
	.string	"__GLIBC_USE_IEC_60559_FUNCS_EXT_C2X 0"
.LASF58:
	.string	"__UINT64_TYPE__ long unsigned int"
.LASF138:
	.string	"__INT_FAST32_MAX__ 0x7fffffffffffffffL"
.LASF59:
	.string	"__INT_LEAST8_TYPE__ signed char"
.LASF563:
	.string	"__size_t "
.LASF506:
	.string	"__LDBL_REDIR1(name,proto,alias) name proto"
.LASF65:
	.string	"__UINT_LEAST32_TYPE__ unsigned int"
.LASF529:
	.string	"__stub_sigreturn "
.LASF452:
	.string	"__ptr_t void *"
.LASF574:
	.string	"__S32_TYPE int"
.LASF73:
	.string	"__UINT_FAST32_TYPE__ long unsigned int"
.LASF669:
	.string	"_BITS_FLOATN_H "
.LASF37:
	.string	"__BYTE_ORDER__ __ORDER_LITTLE_ENDIAN__"
.LASF197:
	.string	"__LDBL_MIN__ 3.36210314311209350626267781732175260e-4932L"
.LASF10:
	.string	"__VERSION__ \"11.4.0\""
.LASF207:
	.string	"__FLT32_MIN_10_EXP__ (-37)"
.LASF183:
	.string	"__DBL_HAS_DENORM__ 1"
.LASF62:
	.string	"__INT_LEAST64_TYPE__ long int"
.LASF84:
	.string	"__WCHAR_MIN__ (-__WCHAR_MAX__ - 1)"
.LASF447:
	.string	"__NTHNL(fct) __attribute__ ((__nothrow__)) fct"
.LASF624:
	.string	"__INO_T_MATCHES_INO64_T 1"
.LASF5:
	.string	"__STDC_UTF_32__ 1"
.LASF619:
	.string	"__BLKSIZE_T_TYPE __SYSCALL_SLONG_TYPE"
.LASF479:
	.string	"__attribute_maybe_unused__ __attribute__ ((__unused__))"
.LASF117:
	.string	"__INT_LEAST16_MAX__ 0x7fff"
.LASF66:
	.string	"__UINT_LEAST64_TYPE__ long unsigned int"
.LASF391:
	.string	"__USE_MISC"
.LASF78:
	.string	"__SCHAR_MAX__ 0x7f"
.LASF690:
	.string	"__f32(x) x ##f32"
.LASF40:
	.string	"__GNUC_EXECUTION_CHARSET_NAME \"UTF-8\""
.LASF495:
	.string	"__extern_always_inline extern __always_inline __attribute__ ((__gnu_inline__))"
.LASF221:
	.string	"__FLT64_DIG__ 15"
.LASF67:
	.string	"__INT_FAST8_TYPE__ signed char"
.LASF20:
	.string	"__PIE__ 2"
.LASF203:
	.string	"__LDBL_IS_IEC_60559__ 2"
.LASF543:
	.string	"__GLIBC_USE_IEC_60559_TYPES_EXT"
.LASF265:
	.string	"__FLT32X_HAS_INFINITY__ 1"
.LASF383:
	.string	"__USE_UNIX98"
.LASF249:
	.string	"__FLT128_HAS_INFINITY__ 1"
.LASF421:
	.string	"_ATFILE_SOURCE"
.LASF350:
	.string	"__MMX_WITH_SSE__ 1"
.LASF63:
	.string	"__UINT_LEAST8_TYPE__ unsigned char"
.LASF328:
	.string	"__SIZEOF_INT128__ 16"
.LASF446:
	.string	"__NTH(fct) __attribute__ ((__nothrow__ __LEAF)) fct"
.LASF670:
	.string	"__HAVE_FLOAT128 1"
.LASF515:
	.string	"__glibc_macro_warning(message) __glibc_macro_warning1 (GCC warning message)"
.LASF115:
	.string	"__INT8_C(c) c"
.LASF552:
	.string	"_T_SIZE "
.LASF243:
	.string	"__FLT128_MAX__ 1.18973149535723176508575932662800702e+4932F128"
.LASF100:
	.string	"__UINTMAX_MAX__ 0xffffffffffffffffUL"
.LASF244:
	.string	"__FLT128_NORM_MAX__ 1.18973149535723176508575932662800702e+4932F128"
.LASF692:
	.string	"__f32x(x) x ##f32x"
.LASF61:
	.string	"__INT_LEAST32_TYPE__ int"
.LASF119:
	.string	"__INT_LEAST16_WIDTH__ 16"
.LASF504:
	.string	"__attribute_copy__(arg) __attribute__ ((__copy__ (arg)))"
.LASF647:
	.string	"__ssize_t_defined "
.LASF551:
	.string	"_T_SIZE_ "
.LASF640:
	.string	"_IO_EOF_SEEN 0x0010"
.LASF571:
	.string	"_BITS_TYPES_H 1"
.LASF439:
	.string	"__glibc_has_attribute(attr) __has_attribute (attr)"
.LASF698:
	.string	"int long int"
.LASF494:
	.string	"__extern_inline extern __inline __attribute__ ((__gnu_inline__))"
.LASF561:
	.string	"_GCC_SIZE_T "
.LASF235:
	.string	"__FLT64_IS_IEC_60559__ 2"
.LASF216:
	.string	"__FLT32_HAS_DENORM__ 1"
.LASF359:
	.string	"__unix__ 1"
.LASF309:
	.string	"__GCC_HAVE_SYNC_COMPARE_AND_SWAP_1 1"
.LASF270:
	.string	"__FLT64X_MIN_EXP__ (-16381)"
.LASF629:
	.string	"_BITS_TIME64_H 1"
.LASF555:
	.string	"_BSD_SIZE_T_ "
.LASF528:
	.string	"__stub_setlogin "
.LASF156:
	.string	"__FLT_DIG__ 6"
.LASF137:
	.string	"__INT_FAST16_WIDTH__ 64"
.LASF19:
	.string	"__pie__ 2"
.LASF687:
	.string	"__HAVE_DISTINCT_FLOAT128X __HAVE_FLOAT128X"
.LASF682:
	.string	"__HAVE_DISTINCT_FLOAT16 __HAVE_FLOAT16"
.LASF369:
	.string	"_STDIO_H 1"
.LASF287:
	.string	"__DEC32_MIN__ 1E-95DF"
.LASF367:
	.string	"__STDC_IEC_60559_COMPLEX__ 201404L"
.LASF149:
	.string	"__GCC_IEC_559 2"
.LASF238:
	.string	"__FLT128_MIN_EXP__ (-16381)"
.LASF680:
	.string	"__HAVE_FLOAT32X 1"
.LASF218:
	.string	"__FLT32_HAS_QUIET_NAN__ 1"
.LASF558:
	.string	"_BSD_SIZE_T_DEFINED_ "
.LASF128:
	.string	"__UINT_LEAST16_MAX__ 0xffff"
.LASF145:
	.string	"__UINT_FAST64_MAX__ 0xffffffffffffffffUL"
.LASF7:
	.string	"__GNUC__ 11"
.LASF480:
	.string	"__attribute_used__ __attribute__ ((__used__))"
.LASF126:
	.string	"__UINT_LEAST8_MAX__ 0xff"
.LASF532:
	.string	"__GLIBC_USE_LIB_EXT2 0"
.LASF299:
	.string	"__DEC128_MIN_EXP__ (-6142)"
.LASF400:
	.string	"__KERNEL_STRICT_NAMES "
.LASF44:
	.string	"__WCHAR_TYPE__ int"
.LASF106:
	.string	"__INT8_MAX__ 0x7f"
.LASF303:
	.string	"__DEC128_EPSILON__ 1E-33DL"
.LASF380:
	.string	"__USE_POSIX199506"
.LASF567:
	.string	"__need_NULL"
.LASF353:
	.string	"__CET__ 3"
.LASF471:
	.string	"__REDIRECT_NTHNL(name,proto,alias) name proto __asm__ (__ASMNAME (#alias)) __THROWNL"
.LASF240:
	.string	"__FLT128_MAX_EXP__ 16384"
.LASF626:
	.string	"__STATFS_MATCHES_STATFS64 1"
.LASF154:
	.string	"__FLT_RADIX__ 2"
.LASF263:
	.string	"__FLT32X_DENORM_MIN__ 4.94065645841246544176568792868221372e-324F32x"
.LASF449:
	.string	"__PMT(args) args"
.LASF592:
	.string	"__GID_T_TYPE __U32_TYPE"
.LASF30:
	.string	"__SIZEOF_LONG_DOUBLE__ 16"
.LASF185:
	.string	"__DBL_HAS_QUIET_NAN__ 1"
.LASF490:
	.string	"__wur "
.LASF283:
	.string	"__FLT64X_IS_IEC_60559__ 2"
.LASF199:
	.string	"__LDBL_DENORM_MIN__ 3.64519953188247460252840593361941982e-4951L"
.LASF600:
	.string	"__PID_T_TYPE __S32_TYPE"
.LASF233:
	.string	"__FLT64_HAS_INFINITY__ 1"
.LASF142:
	.string	"__UINT_FAST8_MAX__ 0xff"
.LASF339:
	.string	"__ATOMIC_HLE_RELEASE 131072"
.LASF191:
	.string	"__LDBL_MAX_EXP__ 16384"
.LASF360:
	.string	"unix 1"
.LASF376:
	.string	"__USE_ISOCXX11"
.LASF587:
	.string	"_BITS_TYPESIZES_H 1"
.LASF612:
	.string	"__USECONDS_T_TYPE __U32_TYPE"
.LASF505:
	.string	"__LDOUBLE_REDIRECTS_TO_FLOAT128_ABI 0"
.LASF75:
	.string	"__INTPTR_TYPE__ long int"
.LASF295:
	.string	"__DEC64_MAX__ 9.999999999999999E384DD"
.LASF657:
	.string	"_BITS_STDIO_LIM_H 1"
.LASF319:
	.string	"__GCC_ATOMIC_INT_LOCK_FREE 2"
.LASF550:
	.string	"_SYS_SIZE_T_H "
.LASF686:
	.string	"__HAVE_DISTINCT_FLOAT64X 0"
.LASF344:
	.string	"__MMX__ 1"
.LASF603:
	.string	"__BLKCNT_T_TYPE __SYSCALL_SLONG_TYPE"
.LASF477:
	.string	"__attribute_pure__ __attribute__ ((__pure__))"
.LASF269:
	.string	"__FLT64X_DIG__ 18"
.LASF125:
	.string	"__INT_LEAST64_WIDTH__ 64"
.LASF516:
	.string	"__HAVE_GENERIC_SELECTION 1"
.LASF236:
	.string	"__FLT128_MANT_DIG__ 113"
.LASF34:
	.string	"__ORDER_LITTLE_ENDIAN__ 1234"
.LASF419:
	.string	"__USE_XOPEN2K 1"
.LASF331:
	.string	"__SIZEOF_PTRDIFF_T__ 8"
.LASF298:
	.string	"__DEC128_MANT_DIG__ 34"
.LASF408:
	.string	"__USE_ISOC99 1"
.LASF53:
	.string	"__INT32_TYPE__ int"
.LASF396:
	.string	"__KERNEL_STRICT_NAMES"
.LASF575:
	.string	"__U32_TYPE unsigned int"
.LASF343:
	.string	"__code_model_small__ 1"
.LASF375:
	.string	"__USE_ISOC95"
.LASF280:
	.string	"__FLT64X_HAS_DENORM__ 1"
.LASF286:
	.string	"__DEC32_MAX_EXP__ 97"
.LASF650:
	.string	"_IONBF 2"
.LASF374:
	.string	"__USE_ISOC99"
.LASF417:
	.string	"__USE_POSIX199309 1"
.LASF548:
	.string	"__SIZE_T__ "
.LASF601:
	.string	"__RLIM_T_TYPE __SYSCALL_ULONG_TYPE"
.LASF538:
	.string	"__GLIBC_USE_IEC_60559_EXT 0"
.LASF658:
	.string	"L_tmpnam 20"
.LASF366:
	.string	"__STDC_IEC_559_COMPLEX__ 1"
.LASF271:
	.string	"__FLT64X_MIN_10_EXP__ (-4931)"
.LASF368:
	.string	"__STDC_ISO_10646__ 201706L"
.LASF556:
	.string	"_SIZE_T_DEFINED_ "
.LASF453:
	.string	"__BEGIN_DECLS "
.LASF672:
	.string	"__HAVE_FLOAT64X 1"
.LASF324:
	.string	"__HAVE_SPECULATION_SAFE_VALUE 1"
.LASF565:
	.string	"NULL"
.LASF241:
	.string	"__FLT128_MAX_10_EXP__ 4932"
.LASF245:
	.string	"__FLT128_MIN__ 3.36210314311209350626267781732175260e-4932F128"
.LASF613:
	.string	"__SUSECONDS_T_TYPE __SYSCALL_SLONG_TYPE"
.LASF655:
	.string	"SEEK_END 2"
.LASF135:
	.string	"__INT_FAST8_WIDTH__ 8"
.LASF223:
	.string	"__FLT64_MIN_10_EXP__ (-307)"
.LASF632:
	.string	"_____fpos_t_defined 1"
.LASF357:
	.string	"linux 1"
.LASF517:
	.string	"__attr_access(x) __attribute__ ((__access__ x))"
.LASF178:
	.string	"__DBL_MAX__ ((double)1.79769313486231570814527423731704357e+308L)"
.LASF405:
	.string	"_DEFAULT_SOURCE 1"
.LASF625:
	.string	"__RLIM_T_MATCHES_RLIM64_T 1"
.LASF333:
	.string	"__amd64__ 1"
.LASF541:
	.string	"__GLIBC_USE_IEC_60559_FUNCS_EXT_C2X"
.LASF633:
	.string	"____mbstate_t_defined 1"
.LASF476:
	.string	"__attribute_alloc_align__(param) __attribute__ ((__alloc_align__ param))"
.LASF210:
	.string	"__FLT32_DECIMAL_DIG__ 9"
.LASF237:
	.string	"__FLT128_DIG__ 33"
.LASF56:
	.string	"__UINT16_TYPE__ short unsigned int"
.LASF679:
	.string	"__HAVE_FLOAT64 1"
.LASF94:
	.string	"__WCHAR_WIDTH__ 32"
.LASF314:
	.string	"__GCC_ATOMIC_CHAR_LOCK_FREE 2"
.LASF673:
	.string	"__HAVE_FLOAT64X_LONG_DOUBLE 1"
.LASF82:
	.string	"__LONG_LONG_MAX__ 0x7fffffffffffffffLL"
.LASF583:
	.string	"__ULONG32_TYPE unsigned int"
.LASF64:
	.string	"__UINT_LEAST16_TYPE__ short unsigned int"
.LASF160:
	.string	"__FLT_MAX_10_EXP__ 38"
.LASF406:
	.string	"__GLIBC_USE_ISOC2X 0"
.LASF262:
	.string	"__FLT32X_EPSILON__ 2.22044604925031308084726333618164062e-16F32x"
.LASF566:
	.string	"NULL ((void *)0)"
.LASF410:
	.string	"__USE_POSIX_IMPLICITLY 1"
.LASF308:
	.string	"__NO_INLINE__ 1"
.LASF497:
	.string	"__va_arg_pack() __builtin_va_arg_pack ()"
.LASF98:
	.string	"__INTMAX_MAX__ 0x7fffffffffffffffL"
.LASF426:
	.string	"__TIMESIZE __WORDSIZE"
.LASF615:
	.string	"__DADDR_T_TYPE __S32_TYPE"
.LASF226:
	.string	"__FLT64_DECIMAL_DIG__ 17"
.LASF311:
	.string	"__GCC_HAVE_SYNC_COMPARE_AND_SWAP_4 1"
.LASF206:
	.string	"__FLT32_MIN_EXP__ (-125)"
.LASF42:
	.string	"__SIZE_TYPE__ long unsigned int"
.LASF620:
	.string	"__FSID_T_TYPE struct { int __val[2]; }"
.LASF334:
	.string	"__x86_64 1"
.LASF651:
	.string	"BUFSIZ 8192"
.LASF162:
	.string	"__FLT_MAX__ 3.40282346638528859811704183484516925e+38F"
.LASF661:
	.string	"L_ctermid 9"
.LASF174:
	.string	"__DBL_MIN_10_EXP__ (-307)"
.LASF706:
	.string	"char"
.LASF645:
	.string	"_VA_LIST_DEFINED "
.LASF190:
	.string	"__LDBL_MIN_10_EXP__ (-4931)"
.LASF77:
	.string	"__GXX_ABI_VERSION 1016"
.LASF205:
	.string	"__FLT32_DIG__ 6"
.LASF232:
	.string	"__FLT64_HAS_DENORM__ 1"
.LASF151:
	.string	"__FLT_EVAL_METHOD__ 0"
.LASF276:
	.string	"__FLT64X_NORM_MAX__ 1.18973149535723176502126385303097021e+4932F64x"
.LASF264:
	.string	"__FLT32X_HAS_DENORM__ 1"
.LASF335:
	.string	"__x86_64__ 1"
.LASF685:
	.string	"__HAVE_DISTINCT_FLOAT32X 0"
.LASF634:
	.string	"_____fpos64_t_defined 1"
.LASF99:
	.string	"__INTMAX_C(c) c ## L"
.LASF469:
	.string	"__REDIRECT(name,proto,alias) name proto __asm__ (__ASMNAME (#alias))"
.LASF606:
	.string	"__FSBLKCNT64_T_TYPE __UQUAD_TYPE"
.LASF275:
	.string	"__FLT64X_MAX__ 1.18973149535723176502126385303097021e+4932F64x"
.LASF292:
	.string	"__DEC64_MIN_EXP__ (-382)"
.LASF510:
	.string	"__LDBL_REDIR2_DECL(name) "
.LASF609:
	.string	"__ID_T_TYPE __U32_TYPE"
.LASF418:
	.string	"__USE_POSIX199506 1"
.LASF616:
	.string	"__KEY_T_TYPE __S32_TYPE"
.LASF11:
	.string	"__ATOMIC_RELAXED 0"
.LASF123:
	.string	"__INT_LEAST64_MAX__ 0x7fffffffffffffffL"
.LASF116:
	.string	"__INT_LEAST8_WIDTH__ 8"
.LASF508:
	.string	"__LDBL_REDIR1_NTH(name,proto,alias) name proto __THROW"
.LASF110:
	.string	"__UINT8_MAX__ 0xff"
.LASF461:
	.string	"__glibc_safe_or_unknown_len(__l,__s,__osz) (__glibc_unsigned_or_positive (__l) && __builtin_constant_p (__glibc_safe_len_cond ((__SIZE_TYPE__) (__l), __s, __osz)) && __glibc_safe_len_cond ((__SIZE_TYPE__) (__l), __s, __osz))"
.LASF111:
	.string	"__UINT16_MAX__ 0xffff"
.LASF389:
	.string	"__USE_LARGEFILE64"
.LASF403:
	.string	"__GLIBC_USE(F) __GLIBC_USE_ ## F"
.LASF179:
	.string	"__DBL_NORM_MAX__ ((double)1.79769313486231570814527423731704357e+308L)"
.LASF70:
	.string	"__INT_FAST64_TYPE__ long int"
.LASF664:
	.string	"stdin stdin"
.LASF481:
	.string	"__attribute_noinline__ __attribute__ ((__noinline__))"
.LASF112:
	.string	"__UINT32_MAX__ 0xffffffffU"
.LASF102:
	.string	"__INTMAX_WIDTH__ 64"
.LASF288:
	.string	"__DEC32_MAX__ 9.999999E96DF"
.LASF186:
	.string	"__DBL_IS_IEC_60559__ 2"
.LASF87:
	.string	"__PTRDIFF_MAX__ 0x7fffffffffffffffL"
.LASF379:
	.string	"__USE_POSIX199309"
.LASF60:
	.string	"__INT_LEAST16_TYPE__ short int"
.LASF208:
	.string	"__FLT32_MAX_EXP__ 128"
.LASF354:
	.string	"__gnu_linux__ 1"
.LASF586:
	.string	"__STD_TYPE typedef"
.LASF595:
	.string	"__MODE_T_TYPE __U32_TYPE"
.LASF337:
	.string	"__SIZEOF_FLOAT128__ 16"
.LASF384:
	.string	"__USE_XOPEN2K"
.LASF172:
	.string	"__DBL_DIG__ 15"
.LASF306:
	.string	"__USER_LABEL_PREFIX__ "
.LASF572:
	.string	"__S16_TYPE short int"
.LASF596:
	.string	"__NLINK_T_TYPE __SYSCALL_ULONG_TYPE"
.LASF23:
	.string	"__LP64__ 1"
.LASF425:
	.string	"__SYSCALL_WORDSIZE 64"
.LASF578:
	.string	"__SQUAD_TYPE long int"
.LASF320:
	.string	"__GCC_ATOMIC_LONG_LOCK_FREE 2"
.LASF253:
	.string	"__FLT32X_DIG__ 15"
.LASF677:
	.string	"__HAVE_FLOAT16 0"
.LASF252:
	.string	"__FLT32X_MANT_DIG__ 53"
.LASF509:
	.string	"__LDBL_REDIR_NTH(name,proto) name proto __THROW"
.LASF22:
	.string	"_LP64 1"
.LASF372:
	.string	"_FEATURES_H 1"
.LASF492:
	.string	"__always_inline __inline __attribute__ ((__always_inline__))"
.LASF597:
	.string	"__FSWORD_T_TYPE __SYSCALL_SLONG_TYPE"
.LASF576:
	.string	"__SLONGWORD_TYPE long int"
.LASF530:
	.string	"__stub_stty "
.LASF397:
	.string	"__GLIBC_USE_ISOC2X"
.LASF273:
	.string	"__FLT64X_MAX_10_EXP__ 4932"
.LASF180:
	.string	"__DBL_MIN__ ((double)2.22507385850720138309023271733240406e-308L)"
.LASF267:
	.string	"__FLT32X_IS_IEC_60559__ 2"
.LASF708:
	.string	"printf"
.LASF313:
	.string	"__GCC_ATOMIC_BOOL_LOCK_FREE 2"
.LASF144:
	.string	"__UINT_FAST32_MAX__ 0xffffffffffffffffUL"
.LASF21:
	.string	"__FINITE_MATH_ONLY__ 0"
.LASF573:
	.string	"__U16_TYPE unsigned short int"
.LASF227:
	.string	"__FLT64_MAX__ 1.79769313486231570814527423731704357e+308F64"
.LASF547:
	.string	"__size_t__ "
.LASF628:
	.string	"__FD_SETSIZE 1024"
.LASF387:
	.string	"__USE_XOPEN2K8XSI"
.LASF696:
	.string	"__CFLOAT32X _Complex _Float32x"
.LASF340:
	.string	"__GCC_ASM_FLAG_OUTPUTS__ 1"
.LASF668:
	.string	"__attr_dealloc_fclose __attr_dealloc (fclose, 1)"
.LASF132:
	.string	"__UINT_LEAST64_MAX__ 0xffffffffffffffffUL"
.LASF438:
	.string	"__PMT"
.LASF579:
	.string	"__UQUAD_TYPE unsigned long int"
.LASF361:
	.string	"__ELF__ 1"
.LASF261:
	.string	"__FLT32X_MIN__ 2.22507385850720138309023271733240406e-308F32x"
.LASF76:
	.string	"__UINTPTR_TYPE__ long unsigned int"
.LASF118:
	.string	"__INT16_C(c) c"
.LASF325:
	.string	"__GCC_HAVE_DWARF2_CFI_ASM 1"
.LASF28:
	.string	"__SIZEOF_FLOAT__ 4"
.LASF290:
	.string	"__DEC32_SUBNORMAL_MIN__ 0.000001E-95DF"
.LASF282:
	.string	"__FLT64X_HAS_QUIET_NAN__ 1"
.LASF168:
	.string	"__FLT_HAS_INFINITY__ 1"
.LASF487:
	.string	"__nonnull(params) __attribute_nonnull__ (params)"
.LASF631:
	.string	"__STD_TYPE"
.LASF594:
	.string	"__INO64_T_TYPE __UQUAD_TYPE"
.LASF433:
	.string	"__GNU_LIBRARY__ 6"
.LASF2:
	.string	"__STDC__ 1"
.LASF468:
	.string	"__glibc_c99_flexarr_available 1"
.LASF346:
	.string	"__SSE2__ 1"
.LASF582:
	.string	"__SLONG32_TYPE int"
.LASF175:
	.string	"__DBL_MAX_EXP__ 1024"
.LASF25:
	.string	"__SIZEOF_LONG__ 8"
.LASF16:
	.string	"__ATOMIC_CONSUME 1"
.LASF390:
	.string	"__USE_FILE_OFFSET64"
.LASF213:
	.string	"__FLT32_MIN__ 1.17549435082228750796873653722224568e-38F32"
.LASF45:
	.string	"__WINT_TYPE__ unsigned int"
.LASF652:
	.string	"EOF (-1)"
.LASF107:
	.string	"__INT16_MAX__ 0x7fff"
.LASF414:
	.string	"_POSIX_C_SOURCE 200809L"
.LASF89:
	.string	"__SCHAR_WIDTH__ 8"
.LASF131:
	.string	"__UINT32_C(c) c ## U"
.LASF69:
	.string	"__INT_FAST32_TYPE__ long int"
.LASF570:
	.string	"__GNUC_VA_LIST "
.LASF29:
	.string	"__SIZEOF_DOUBLE__ 8"
.LASF9:
	.string	"__GNUC_PATCHLEVEL__ 0"
.LASF127:
	.string	"__UINT8_C(c) c"
.LASF646:
	.string	"__off_t_defined "
.LASF604:
	.string	"__BLKCNT64_T_TYPE __SQUAD_TYPE"
.LASF395:
	.string	"__USE_FORTIFY_LEVEL"
.LASF531:
	.string	"__GLIBC_USE_LIB_EXT2"
.LASF86:
	.string	"__WINT_MIN__ 0U"
.LASF187:
	.string	"__LDBL_MANT_DIG__ 64"
.LASF653:
	.string	"SEEK_SET 0"
.LASF456:
	.string	"__bos0(ptr) __builtin_object_size (ptr, 0)"
.LASF163:
	.string	"__FLT_NORM_MAX__ 3.40282346638528859811704183484516925e+38F"
.LASF4:
	.string	"__STDC_UTF_16__ 1"
.LASF198:
	.string	"__LDBL_EPSILON__ 1.08420217248550443400745280086994171e-19L"
.LASF219:
	.string	"__FLT32_IS_IEC_60559__ 2"
.LASF627:
	.string	"__KERNEL_OLD_TIMEVAL_MATCHES_TIMEVAL64 1"
.LASF484:
	.string	"__attribute_format_arg__(x) __attribute__ ((__format_arg__ (x)))"
.LASF491:
	.string	"__always_inline"
.LASF691:
	.string	"__f64(x) x ##f64"
.LASF675:
	.string	"__CFLOAT128 _Complex _Float128"
.LASF201:
	.string	"__LDBL_HAS_INFINITY__ 1"
.LASF415:
	.string	"__USE_POSIX 1"
.LASF462:
	.string	"__glibc_unsafe_len(__l,__s,__osz) (__glibc_unsigned_or_positive (__l) && __builtin_constant_p (__glibc_safe_len_cond ((__SIZE_TYPE__) (__l), __s, __osz)) && !__glibc_safe_len_cond ((__SIZE_TYPE__) (__l), __s, __osz))"
.LASF150:
	.string	"__GCC_IEC_559_COMPLEX 2"
.LASF104:
	.string	"__SIG_ATOMIC_MIN__ (-__SIG_ATOMIC_MAX__ - 1)"
.LASF689:
	.string	"__HAVE_FLOATN_NOT_TYPEDEF 1"
.LASF693:
	.string	"__f64x(x) x ##f64x"
.LASF329:
	.string	"__SIZEOF_WCHAR_T__ 4"
.LASF482:
	.string	"__attribute_deprecated__ __attribute__ ((__deprecated__))"
.LASF239:
	.string	"__FLT128_MIN_10_EXP__ (-4931)"
.LASF38:
	.string	"__FLOAT_WORD_ORDER__ __ORDER_LITTLE_ENDIAN__"
.LASF310:
	.string	"__GCC_HAVE_SYNC_COMPARE_AND_SWAP_2 1"
.LASF695:
	.string	"__CFLOAT64 _Complex _Float64"
.LASF284:
	.string	"__DEC32_MANT_DIG__ 7"
.LASF215:
	.string	"__FLT32_DENORM_MIN__ 1.40129846432481707092372958328991613e-45F32"
.LASF522:
	.string	"__attribute_returns_twice__ __attribute__ ((__returns_twice__))"
.LASF143:
	.string	"__UINT_FAST16_MAX__ 0xffffffffffffffffUL"
.LASF502:
	.string	"__attribute_nonstring__ __attribute__ ((__nonstring__))"
.LASF569:
	.string	"__need___va_list"
.LASF108:
	.string	"__INT32_MAX__ 0x7fffffff"
.LASF560:
	.string	"___int_size_t_h "
.LASF519:
	.string	"__attr_access_none(argno) __attribute__ ((__access__ (__none__, argno)))"
.LASF458:
	.string	"__glibc_objsize(__o) __bos (__o)"
.LASF13:
	.string	"__ATOMIC_ACQUIRE 2"
.LASF129:
	.string	"__UINT16_C(c) c"
.LASF109:
	.string	"__INT64_MAX__ 0x7fffffffffffffffL"
.LASF545:
	.string	"__need_size_t "
.LASF455:
	.string	"__bos(ptr) __builtin_object_size (ptr, __USE_FORTIFY_LEVEL > 1)"
.LASF605:
	.string	"__FSBLKCNT_T_TYPE __SYSCALL_ULONG_TYPE"
.LASF441:
	.string	"__glibc_has_extension(ext) 0"
.LASF352:
	.string	"__SEG_GS 1"
.LASF348:
	.string	"__SSE_MATH__ 1"
.LASF422:
	.string	"_ATFILE_SOURCE 1"
.LASF47:
	.string	"__UINTMAX_TYPE__ long unsigned int"
.LASF564:
	.string	"__need_size_t"
.LASF697:
	.string	"__CFLOAT64X _Complex _Float64x"
.LASF442:
	.string	"__LEAF , __leaf__"
.LASF518:
	.string	"__fortified_attr_access(a,o,s) __attr_access ((a, o, s))"
.LASF674:
	.string	"__f128(x) x ##f128"
.LASF496:
	.string	"__fortify_function __extern_always_inline __attribute_artificial__"
.LASF105:
	.string	"__SIG_ATOMIC_WIDTH__ 32"
.LASF450:
	.string	"__CONCAT(x,y) x ## y"
.LASF483:
	.string	"__attribute_deprecated_msg__(msg) __attribute__ ((__deprecated__ (msg)))"
.LASF79:
	.string	"__SHRT_MAX__ 0x7fff"
.LASF317:
	.string	"__GCC_ATOMIC_WCHAR_T_LOCK_FREE 2"
.LASF520:
	.string	"__attr_dealloc(dealloc,argno) __attribute__ ((__malloc__ (dealloc, argno)))"
.LASF644:
	.string	"_IO_USER_LOCK 0x8000"
.LASF36:
	.string	"__ORDER_PDP_ENDIAN__ 3412"
.LASF684:
	.string	"__HAVE_DISTINCT_FLOAT64 0"
.LASF659:
	.string	"TMP_MAX 238328"
.LASF161:
	.string	"__FLT_DECIMAL_DIG__ 9"
.LASF581:
	.string	"__UWORD_TYPE unsigned long int"
.LASF225:
	.string	"__FLT64_MAX_10_EXP__ 308"
.LASF451:
	.string	"__STRING(x) #x"
.LASF636:
	.string	"__FILE_defined 1"
.LASF189:
	.string	"__LDBL_MIN_EXP__ (-16381)"
.LASF95:
	.string	"__WINT_WIDTH__ 32"
.LASF536:
	.string	"__GLIBC_USE_IEC_60559_BFP_EXT_C2X 0"
.LASF277:
	.string	"__FLT64X_MIN__ 3.36210314311209350626267781732175260e-4932F64x"
.LASF134:
	.string	"__INT_FAST8_MAX__ 0x7f"
.LASF24:
	.string	"__SIZEOF_INT__ 4"
.LASF214:
	.string	"__FLT32_EPSILON__ 1.19209289550781250000000000000000000e-7F32"
.LASF370:
	.string	"__GLIBC_INTERNAL_STARTING_HEADER_IMPLEMENTATION "
.LASF580:
	.string	"__SWORD_TYPE long int"
.LASF704:
	.string	"short int"
.LASF435:
	.string	"__GLIBC_MINOR__ 35"
.LASF81:
	.string	"__LONG_MAX__ 0x7fffffffffffffffL"
.LASF250:
	.string	"__FLT128_HAS_QUIET_NAN__ 1"
.LASF293:
	.string	"__DEC64_MAX_EXP__ 385"
.LASF255:
	.string	"__FLT32X_MIN_10_EXP__ (-307)"
.LASF378:
	.string	"__USE_POSIX2"
.LASF705:
	.string	"long int"
.LASF598:
	.string	"__OFF_T_TYPE __SYSCALL_SLONG_TYPE"
.LASF101:
	.string	"__UINTMAX_C(c) c ## UL"
.LASF638:
	.string	"__getc_unlocked_body(_fp) (__glibc_unlikely ((_fp)->_IO_read_ptr >= (_fp)->_IO_read_end) ? __uflow (_fp) : *(unsigned char *) (_fp)->_IO_read_ptr++)"
.LASF297:
	.string	"__DEC64_SUBNORMAL_MIN__ 0.000000000000001E-383DD"
.LASF281:
	.string	"__FLT64X_HAS_INFINITY__ 1"
.LASF429:
	.string	"__USE_FORTIFY_LEVEL 0"
.LASF300:
	.string	"__DEC128_MAX_EXP__ 6145"
.LASF254:
	.string	"__FLT32X_MIN_EXP__ (-1021)"
.LASF147:
	.string	"__INTPTR_WIDTH__ 64"
.LASF593:
	.string	"__INO_T_TYPE __SYSCALL_ULONG_TYPE"
.LASF71:
	.string	"__UINT_FAST8_TYPE__ unsigned char"
.LASF121:
	.string	"__INT32_C(c) c"
.LASF608:
	.string	"__FSFILCNT64_T_TYPE __UQUAD_TYPE"
.LASF202:
	.string	"__LDBL_HAS_QUIET_NAN__ 1"
.LASF51:
	.string	"__INT8_TYPE__ signed char"
.LASF85:
	.string	"__WINT_MAX__ 0xffffffffU"
.LASF355:
	.string	"__linux 1"
.LASF539:
	.string	"__GLIBC_USE_IEC_60559_FUNCS_EXT"
.LASF503:
	.string	"__attribute_copy__"
.LASF196:
	.string	"__LDBL_NORM_MAX__ 1.18973149535723176502126385303097021e+4932L"
.LASF688:
	.string	"__HAVE_FLOAT128_UNLIKE_LDBL (__HAVE_DISTINCT_FLOAT128 && __LDBL_MANT_DIG__ != 113)"
.LASF57:
	.string	"__UINT32_TYPE__ unsigned int"
.LASF392:
	.string	"__USE_ATFILE"
.LASF386:
	.string	"__USE_XOPEN2K8"
.LASF513:
	.string	"__REDIRECT_NTH_LDBL(name,proto,alias) __REDIRECT_NTH (name, proto, alias)"
.LASF656:
	.string	"P_tmpdir \"/tmp\""
.LASF470:
	.string	"__REDIRECT_NTH(name,proto,alias) name proto __asm__ (__ASMNAME (#alias)) __THROW"
.LASF381:
	.string	"__USE_XOPEN"
.LASF246:
	.string	"__FLT128_EPSILON__ 1.92592994438723585305597794258492732e-34F128"
.LASF463:
	.string	"__glibc_fortify(f,__l,__s,__osz,...) (__glibc_safe_or_unknown_len (__l, __s, __osz) ? __ ## f ## _alias (__VA_ARGS__) : (__glibc_unsafe_len (__l, __s, __osz) ? __ ## f ## _chk_warn (__VA_ARGS__, __osz) : __ ## f ## _chk (__VA_ARGS__, __osz)))"
.LASF413:
	.string	"_POSIX_C_SOURCE"
.LASF444:
	.string	"__THROW __attribute__ ((__nothrow__ __LEAF))"
.LASF26:
	.string	"__SIZEOF_LONG_LONG__ 8"
.LASF639:
	.string	"__putc_unlocked_body(_ch,_fp) (__glibc_unlikely ((_fp)->_IO_write_ptr >= (_fp)->_IO_write_end) ? __overflow (_fp, (unsigned char) (_ch)) : (unsigned char) (*(_fp)->_IO_write_ptr++ = (_ch)))"
.LASF55:
	.string	"__UINT8_TYPE__ unsigned char"
.LASF90:
	.string	"__SHRT_WIDTH__ 16"
.LASF349:
	.string	"__SSE2_MATH__ 1"
.LASF621:
	.string	"__SSIZE_T_TYPE __SWORD_TYPE"
.LASF584:
	.string	"__S64_TYPE long int"
.LASF228:
	.string	"__FLT64_NORM_MAX__ 1.79769313486231570814527423731704357e+308F64"
.LASF607:
	.string	"__FSFILCNT_T_TYPE __SYSCALL_ULONG_TYPE"
.LASF681:
	.string	"__HAVE_FLOAT128X 0"
.LASF139:
	.string	"__INT_FAST32_WIDTH__ 64"
.LASF393:
	.string	"__USE_DYNAMIC_STACK_SIZE"
.LASF683:
	.string	"__HAVE_DISTINCT_FLOAT32 0"
.LASF420:
	.string	"__USE_XOPEN2K8 1"
.LASF614:
	.string	"__SUSECONDS64_T_TYPE __SQUAD_TYPE"
.LASF544:
	.string	"__GLIBC_USE_IEC_60559_TYPES_EXT 0"
.LASF39:
	.string	"__SIZEOF_POINTER__ 8"
.LASF230:
	.string	"__FLT64_EPSILON__ 2.22044604925031308084726333618164062e-16F64"
.LASF268:
	.string	"__FLT64X_MANT_DIG__ 64"
.LASF404:
	.string	"_DEFAULT_SOURCE"
.LASF83:
	.string	"__WCHAR_MAX__ 0x7fffffff"
.LASF568:
	.string	"__need___va_list "
.LASF155:
	.string	"__FLT_MANT_DIG__ 24"
.LASF423:
	.string	"__WORDSIZE 64"
.LASF91:
	.string	"__INT_WIDTH__ 32"
.LASF194:
	.string	"__LDBL_DECIMAL_DIG__ 21"
.LASF323:
	.string	"__GCC_ATOMIC_POINTER_LOCK_FREE 2"
.LASF523:
	.string	"__stub___compat_bdflush "
.LASF662:
	.string	"FOPEN_MAX"
.LASF709:
	.string	"main"
.LASF351:
	.string	"__SEG_FS 1"
.LASF448:
	.string	"__P(args) args"
.LASF611:
	.string	"__TIME_T_TYPE __SYSCALL_SLONG_TYPE"
.LASF72:
	.string	"__UINT_FAST16_TYPE__ long unsigned int"
.LASF434:
	.string	"__GLIBC__ 2"
.LASF3:
	.string	"__STDC_VERSION__ 201710L"
.LASF699:
	.string	"long unsigned int"
.LASF514:
	.string	"__glibc_macro_warning1(message) _Pragma (#message)"
.LASF316:
	.string	"__GCC_ATOMIC_CHAR32_T_LOCK_FREE 2"
.LASF501:
	.string	"__glibc_likely(cond) __builtin_expect ((cond), 1)"
.LASF358:
	.string	"__unix 1"
.LASF32:
	.string	"__CHAR_BIT__ 8"
.LASF610:
	.string	"__CLOCK_T_TYPE __SYSCALL_SLONG_TYPE"
.LASF338:
	.string	"__ATOMIC_HLE_ACQUIRE 65536"
.LASF6:
	.string	"__STDC_HOSTED__ 1"
.LASF97:
	.string	"__SIZE_WIDTH__ 64"
.LASF512:
	.string	"__REDIRECT_LDBL(name,proto,alias) __REDIRECT (name, proto, alias)"
.LASF365:
	.string	"__STDC_IEC_60559_BFP__ 201404L"
.LASF671:
	.string	"__HAVE_DISTINCT_FLOAT128 1"
.LASF473:
	.string	"__ASMNAME2(prefix,cname) __STRING (prefix) cname"
.LASF488:
	.string	"__returns_nonnull __attribute__ ((__returns_nonnull__))"
.LASF526:
	.string	"__stub_gtty "
.LASF92:
	.string	"__LONG_WIDTH__ 64"
.LASF113:
	.string	"__UINT64_MAX__ 0xffffffffffffffffUL"
.LASF459:
	.string	"__glibc_safe_len_cond(__l,__s,__osz) ((__l) <= (__osz) / (__s))"
.LASF385:
	.string	"__USE_XOPEN2KXSI"
.LASF475:
	.string	"__attribute_alloc_size__(params) __attribute__ ((__alloc_size__ params))"
.LASF114:
	.string	"__INT_LEAST8_MAX__ 0x7f"
.LASF341:
	.string	"__k8 1"
.LASF321:
	.string	"__GCC_ATOMIC_LLONG_LOCK_FREE 2"
.LASF159:
	.string	"__FLT_MAX_EXP__ 128"
.LASF499:
	.string	"__restrict_arr __restrict"
.LASF15:
	.string	"__ATOMIC_ACQ_REL 4"
.LASF485:
	.string	"__attribute_format_strfmon__(a,b) __attribute__ ((__format__ (__strfmon__, a, b)))"
.LASF701:
	.string	"unsigned char"
.LASF641:
	.string	"__feof_unlocked_body(_fp) (((_fp)->_flags & _IO_EOF_SEEN) != 0)"
.LASF54:
	.string	"__INT64_TYPE__ long int"
.LASF164:
	.string	"__FLT_MIN__ 1.17549435082228750796873653722224568e-38F"
.LASF585:
	.string	"__U64_TYPE unsigned long int"
.LASF521:
	.string	"__attr_dealloc_free __attr_dealloc (__builtin_free, 1)"
.LASF153:
	.string	"__DEC_EVAL_METHOD__ 2"
.LASF394:
	.string	"__USE_GNU"
.LASF663:
	.string	"FOPEN_MAX 16"
.LASF678:
	.string	"__HAVE_FLOAT32 1"
.LASF347:
	.string	"__FXSR__ 1"
.LASF443:
	.string	"__LEAF_ATTR __attribute__ ((__leaf__))"
.LASF122:
	.string	"__INT_LEAST32_WIDTH__ 32"
.LASF41:
	.string	"__GNUC_WIDE_EXECUTION_CHARSET_NAME \"UTF-32LE\""
.LASF402:
	.string	"__glibc_clang_prereq(maj,min) 0"
.LASF588:
	.string	"__SYSCALL_SLONG_TYPE __SLONGWORD_TYPE"
.LASF356:
	.string	"__linux__ 1"
.LASF18:
	.string	"__PIC__ 2"
.LASF637:
	.string	"__struct_FILE_defined 1"
.LASF285:
	.string	"__DEC32_MIN_EXP__ (-94)"
.LASF412:
	.string	"_POSIX_SOURCE 1"
.LASF431:
	.string	"__GLIBC_USE_DEPRECATED_SCANF 0"
.LASF533:
	.string	"__GLIBC_USE_IEC_60559_BFP_EXT"
.LASF88:
	.string	"__SIZE_MAX__ 0xffffffffffffffffUL"
.LASF591:
	.string	"__UID_T_TYPE __U32_TYPE"
.LASF577:
	.string	"__ULONGWORD_TYPE unsigned long int"
.LASF318:
	.string	"__GCC_ATOMIC_SHORT_LOCK_FREE 2"
.LASF274:
	.string	"__FLT64X_DECIMAL_DIG__ 21"
.LASF460:
	.string	"__glibc_unsigned_or_positive(__l) ((__typeof (__l)) 0 < (__typeof (__l)) -1 || (__builtin_constant_p (__l) && (__l) > 0))"
.LASF382:
	.string	"__USE_XOPEN_EXTENDED"
.LASF136:
	.string	"__INT_FAST16_MAX__ 0x7fffffffffffffffL"
.LASF676:
	.string	"_BITS_FLOATN_COMMON_H "
.LASF165:
	.string	"__FLT_EPSILON__ 1.19209289550781250000000000000000000e-7F"
.LASF660:
	.string	"FILENAME_MAX 4096"
.LASF666:
	.string	"stderr stderr"
.LASF251:
	.string	"__FLT128_IS_IEC_60559__ 2"
.LASF152:
	.string	"__FLT_EVAL_METHOD_TS_18661_3__ 0"
.LASF184:
	.string	"__DBL_HAS_INFINITY__ 1"
.LASF489:
	.string	"__attribute_warn_unused_result__ __attribute__ ((__warn_unused_result__))"
.LASF124:
	.string	"__INT64_C(c) c ## L"
.LASF454:
	.string	"__END_DECLS "
.LASF222:
	.string	"__FLT64_MIN_EXP__ (-1021)"
.LASF43:
	.string	"__PTRDIFF_TYPE__ long int"
.LASF617:
	.string	"__CLOCKID_T_TYPE __S32_TYPE"
.LASF68:
	.string	"__INT_FAST16_TYPE__ long int"
.LASF364:
	.string	"__STDC_IEC_559__ 1"
.LASF304:
	.string	"__DEC128_SUBNORMAL_MIN__ 0.000000000000000000000000000000001E-6143DL"
.LASF363:
	.string	"_STDC_PREDEF_H 1"
.LASF642:
	.string	"_IO_ERR_SEEN 0x0020"
.LASF388:
	.string	"__USE_LARGEFILE"
.LASF703:
	.string	"signed char"
.LASF336:
	.string	"__SIZEOF_FLOAT80__ 16"
.LASF266:
	.string	"__FLT32X_HAS_QUIET_NAN__ 1"
.LASF176:
	.string	"__DBL_MAX_10_EXP__ 308"
.LASF427:
	.string	"__USE_MISC 1"
.LASF702:
	.string	"short unsigned int"
.LASF707:
	.string	"GNU C17 11.4.0 -mtune=generic -march=x86-64 -g3 -O0 -fasynchronous-unwind-tables -fstack-protector-strong -fstack-clash-protection -fcf-protection"
.LASF17:
	.string	"__pic__ 2"
.LASF307:
	.string	"__GNUC_STDC_INLINE__ 1"
.LASF345:
	.string	"__SSE__ 1"
.LASF540:
	.string	"__GLIBC_USE_IEC_60559_FUNCS_EXT 0"
.LASF33:
	.string	"__BIGGEST_ALIGNMENT__ 16"
.LASF562:
	.string	"_SIZET_ "
.LASF247:
	.string	"__FLT128_DENORM_MIN__ 6.47517511943802511092443895822764655e-4966F128"
.LASF534:
	.string	"__GLIBC_USE_IEC_60559_BFP_EXT 0"
.LASF527:
	.string	"__stub_revoke "
.LASF46:
	.string	"__INTMAX_TYPE__ long int"
.LASF157:
	.string	"__FLT_MIN_EXP__ (-125)"
.LASF327:
	.string	"__SSP_STRONG__ 3"
.LASF466:
	.string	"__errordecl(name,msg) extern void name (void) __attribute__((__error__ (msg)))"
.LASF302:
	.string	"__DEC128_MAX__ 9.999999999999999999999999999999999E6144DL"
.LASF305:
	.string	"__REGISTER_PREFIX__ "
.LASF511:
	.string	"__LDBL_REDIR_DECL(name) "
.LASF599:
	.string	"__OFF64_T_TYPE __SQUAD_TYPE"
.LASF373:
	.string	"__USE_ISOC11"
.LASF553:
	.string	"__SIZE_T "
.LASF590:
	.string	"__DEV_T_TYPE __UQUAD_TYPE"
.LASF622:
	.string	"__CPU_MASK_TYPE __SYSCALL_ULONG_TYPE"
.LASF130:
	.string	"__UINT_LEAST32_MAX__ 0xffffffffU"
.LASF440:
	.string	"__glibc_has_builtin(name) __has_builtin (name)"
.LASF472:
	.string	"__ASMNAME(cname) __ASMNAME2 (__USER_LABEL_PREFIX__, cname)"
.LASF257:
	.string	"__FLT32X_MAX_10_EXP__ 308"
.LASF332:
	.string	"__amd64 1"
.LASF371:
	.string	"__GLIBC_INTERNAL_STARTING_HEADER_IMPLEMENTATION"
.LASF260:
	.string	"__FLT32X_NORM_MAX__ 1.79769313486231570814527423731704357e+308F32x"
.LASF231:
	.string	"__FLT64_DENORM_MIN__ 4.94065645841246544176568792868221372e-324F64"
.LASF424:
	.string	"__WORDSIZE_TIME64_COMPAT32 1"
.LASF209:
	.string	"__FLT32_MAX_10_EXP__ 38"
.LASF242:
	.string	"__FLT128_DECIMAL_DIG__ 36"
.LASF96:
	.string	"__PTRDIFF_WIDTH__ 64"
.LASF120:
	.string	"__INT_LEAST32_MAX__ 0x7fffffff"
.LASF74:
	.string	"__UINT_FAST64_TYPE__ long unsigned int"
.LASF618:
	.string	"__TIMER_T_TYPE void *"
.LASF643:
	.string	"__ferror_unlocked_body(_fp) (((_fp)->_flags & _IO_ERR_SEEN) != 0)"
.LASF445:
	.string	"__THROWNL __attribute__ ((__nothrow__))"
.LASF192:
	.string	"__LDBL_MAX_10_EXP__ 4932"
.LASF294:
	.string	"__DEC64_MIN__ 1E-383DD"
.LASF211:
	.string	"__FLT32_MAX__ 3.40282346638528859811704183484516925e+38F32"
.LASF181:
	.string	"__DBL_EPSILON__ ((double)2.22044604925031308084726333618164062e-16L)"
.LASF649:
	.string	"_IOLBF 1"
.LASF326:
	.string	"__PRAGMA_REDEFINE_EXTNAME 1"
.LASF50:
	.string	"__SIG_ATOMIC_TYPE__ int"
.LASF279:
	.string	"__FLT64X_DENORM_MIN__ 3.64519953188247460252840593361941982e-4951F64x"
.LASF377:
	.string	"__USE_POSIX"
.LASF248:
	.string	"__FLT128_HAS_DENORM__ 1"
.LASF399:
	.string	"__GLIBC_USE_DEPRECATED_SCANF"
.LASF177:
	.string	"__DBL_DECIMAL_DIG__ 17"
.LASF200:
	.string	"__LDBL_HAS_DENORM__ 1"
.LASF602:
	.string	"__RLIM64_T_TYPE __UQUAD_TYPE"
.LASF486:
	.string	"__attribute_nonnull__(params) __attribute__ ((__nonnull__ params))"
.LASF220:
	.string	"__FLT64_MANT_DIG__ 53"
.LASF291:
	.string	"__DEC64_MANT_DIG__ 16"
.LASF167:
	.string	"__FLT_HAS_DENORM__ 1"
.LASF141:
	.string	"__INT_FAST64_WIDTH__ 64"
.LASF193:
	.string	"__DECIMAL_DIG__ 21"
	.section	.debug_line_str,"MS",@progbits,1
.LASF1:
	.string	"/home/nagy/Desktop/test/c"
.LASF0:
	.string	"/home/nagy/Desktop/test/c/main.c"
	.ident	"GCC: (Ubuntu 11.4.0-1ubuntu1~22.04.2) 11.4.0"
	.section	.note.GNU-stack,"",@progbits
	.section	.note.gnu.property,"a"
	.align 8
	.long	1f - 0f
	.long	4f - 1f
	.long	5
0:
	.string	"GNU"
1:
	.align 8
	.long	0xc0000002
	.long	3f - 2f
2:
	.long	0x3
3:
	.align 8
4:
