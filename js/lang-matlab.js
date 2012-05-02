/**
 * @fileoverview
 * Registers a language handler for MATLAB.
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code inside an HTML tag like
 *     <pre class="prettyprint lang-matlab">
 *     </pre>
 */
(function (PR) {
	/*
		PR_PLAIN: plain text
		PR_STRING: string literals
		PR_KEYWORD: keywords
		PR_COMMENT: comments
		PR_TYPE: types
		PR_LITERAL: literal values (1, null, true, ..)
		PR_PUNCTUATION: punctuation string
		PR_SOURCE: embedded source
		PR_DECLARATION: markup declaration such as a DOCTYPE
		PR_TAG: sgml tag
		PR_ATTRIB_NAME: sgml attribute name
		PR_ATTRIB_VALUE: sgml attribute value
	*/
	var PR_SYSCMD = "syscmd",
		PR_LINE_CONTINUATION = "linecont",
		PR_CODE_OUTPUT = "codeoutput";
	
	// patterns that always start with a known character. Must have a shortcut string.
	var shortcutStylePatterns = [
		// whitespaces: space, tab, carriage return, line feed, line tab, form-feed, non-break space
		[PR.PR_PLAIN, /^[ \t\r\n\v\f\xA0]+/, null, " \t\r\n\u000b\u000c\u00a0"],
	
		// single-line comments
		[PR.PR_COMMENT, /^%[^\r\n]*/, null, "%"],
	
		// system commands
		[PR_SYSCMD, /^![^\r\n]*/, null, "!"]
	];
	
	// patterns that will be tried in order if the shortcut ones fail. May have shortcuts.
	var fallthroughStylePatterns = [
		// line continuation
		[PR_LINE_CONTINUATION, /^\.\.\.\s*[\r\n]/, null],
	
		// command outputs (both loose/compact format)
		/*
		>> EXP
		VAR = 
		     VAL
		*/
		[PR_CODE_OUTPUT, /^>>\s+[^\r\n]*[\r\n]{1,2}[^=]*=[^\r\n]*[\r\n]{1,2}[^\r\n]*/, null],
	
	];
	
	PR.registerLangHandler(
		PR.createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns),
		["matlab"]
	);
})(window.PR);
