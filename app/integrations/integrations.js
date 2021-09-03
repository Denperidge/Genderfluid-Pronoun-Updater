function ChainTimeout (timeout, ...args) {
    for (var i = 0; i < args.length; i++) {
        setTimeout(args[i](), timeout + (timeout*i));
    }
}