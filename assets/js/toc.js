/*
 * jQuery autoTOC plugin
 *
 * Doc: https://binney.net/solid.things/jquery.autotoc/doc.htm
 * Copyright (c) 2009-2021 Peter Binney
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
;
(function($) {
	$.fn.autoTOC = function(options)
	{
		var version = '1.7 (27-Oct-2021)'
		var options = jQuery.extend({
			selector: "h1,h2,h3,h4",			// jQuery selector string to identify TOC items

			autoIndent: true,				// Whether to indent TOC items for elements that are (appear to be)
											// further down the "selector" list.
											// Assumes "selector" is ordered comma-separated list of tag names.
											// eg: with default ("h1,h2,h3,h4,h5,h6"), indents everything after H1
											// But, indent only happens if higher level selectors exist on the page.
											// ie: if doc only contains H6's, there's no indenting
			indentLevels: null,				// TBD

			cols: 4,						// Preferred number of columns in TOC (assuming enough items). Could be
											// more than this if too many orphans.

			colSuffixSections: null,		// Allows for adding arbitrary HTML to each column in the ToC.
											// If non-null, is an array of HTML to add to column(s) in the ToC.
											// The array is reverse-indexed from the last column.
											// ie: item[0] is appended to the last columen,
											//     item[1] to the penultimate one, etc.

			avoidOrphans: true,				// TRUE if selector is a precedence-ordered, comma-separated, list of tagnames
											// and child elements are not to be orphaned by a column break in the TOC.
											// Thus, with the default selector, an h2-generated item that is due to
											// fall at the end of a column will be pushed to the top of the next column if
											// it precedes an h3-generated one (that would otherwise be top of the next column).

			LIclassPrefix: null,			// If non-null, each LI in the TOC is given a CSS class of this name plus the
											// tagName of the element it was generated from as: prefix-tagName
											// eg: if prefix set to "TOC", an entry from an H2 would have class="TOC-H2"

			addInfo: false,
			debug: false
		}, options);

		if (options.debug)
			window.status = ""
		var items = $(options.selector)
		var rowsPerCol = parseInt((items.length + options.cols - 1) / options.cols)
		var cols = 0 	// Set in main function
		if (false)
			alert ("items=" + items.length + " cols=" + cols + " rowsPerCol=" + rowsPerCol)
		var tagName	// Set/updated by isColBreak()
		var indentSelectors = new Array()	// Non-empty if autoIndent-ing
		if (options.autoIndent)
		{
			options.indentLevels = new Array()	// Index: tagName (UPPER case)  Value: Indent level (0 is none)
			indentSelectors = options.selector.replace(/ /g, "").toUpperCase().split(",")
			for (var i=0; i < indentSelectors.length; i++)
			{
				var tagName = indentSelectors[i].replace(/:.*/, "");	// Strip any qualifier
				indentSelectors[i] = tagName;							// and replace in the array
				options.indentLevels[tagName] = i;
			}
		}

		return this.each(function()
		{
			var autoAnchorsAdded = 0
			var autoAnchorBase = ""
			var autoAnchorBaseSearches = 0
			var autoAnchorFailures = 0
			var TOChtml = ""
			var colEnd = ""
			var col = 0
			var rowsThisCol = 0
			var indentLevel = 0
			var minIndentLevel = -1	// 0+ value used
			var indentLevels = new Array()	// Working copy of options.indentLevels, with tags restricted to those
											// found in the document and levels normalised to 0, 1, ... etc
			// Run through items to count columns and work out what selectors we have
			for (var i=0; i < items.length; i++)
			{
				if (isColBreak(i, rowsThisCol))
				{
					cols++
					rowsThisCol = 0
				}
				rowsThisCol++	// Needed for addToLastCol processing
				if (indentSelectors.length > 0 && !(typeof options.indentLevels[tagName] === 'undefined'))
					indentLevels[tagName] = -1	// Note all tagNames with -1 indent value for now
			}
			for (var i=0, j=0; i < indentSelectors.length; i++)
			{	// Allocate indent levels to selectors in this document
				var selector = indentSelectors[i]
				if (indentLevels[selector] == -1)
					indentLevels[selector] = j++
			}
			if (options.debug)
			{
				var s = ""
				for (var i in indentLevels)
					s += "\n" + i + " : " + indentLevels[i]
				alert (indentSelectors.length + "-Selectors: " + indentSelectors
					+ " " + indentLevels.length + " indentLevels:" + s)
			}

			rowsThisCol = 0
			var indentLevel = 0		// Current (if any) indent level.
			for (var i=0; i < items.length; i++)
			{
				if (isColBreak(i, rowsThisCol))
				{	// Start first/new column
					if (i > 0)
					{	// New column
						for (var j=0; j < indentLevel; j++)
							TOChtml += colEnd	// End any indenting
						TOChtml += colEnd + colSuffix(col) + "</td><!-- NEW COL -->";
					}
					col++
					rowsThisCol = 0
					TOChtml += "\n<td>\n<!-- col=" + col + " indentLevel=" + indentLevel + " -->\n";
					//         + "<ul>\n";
					colEnd = "</ul><!-- /col -->";
					indentLevel = indentLevels[tagName]
					for (var j=0; j < indentLevel; j++) {
						TOChtml += '<ul style="list-style: none;"><li>\n';	// If column starts with non-0 indent tag, push in UL's to match its level
						if (options.debug) console.log("Added UL j=" + j + " indentLevel=" + indentLevel);
					}
					TOChtml += "<ul>\n";
				}
				var itemIndent = indentLevels[tagName]
				var	tooltip = " indentLevel=" + indentLevel + " itemIndent=" + itemIndent 
				if (indentLevel > itemIndent)
				{	// Need to reduce indent
					if (options.debug) console.log("Reduce indent. indentLevel=" + indentLevel + " itemIndent=" + itemIndent);
					for (; indentLevel > itemIndent; indentLevel--)
						TOChtml += colEnd
				}
				else if (indentLevel < itemIndent)
				{	// Need to increase indent
					if (options.debug) console.log("Increase indent. indentLevel=" + indentLevel + " itemIndent=" + itemIndent);
					for (; indentLevel < itemIndent; indentLevel++) {
						TOChtml += "<ul>";
					}
				}
				else if (options.debug) console.log("Same indent. indentLevel=" + indentLevel + " itemIndent=" + itemIndent);
				tooltip = " title='From " + tagName + " indent=" + itemIndent + tooltip + "'"
				if (!options.debug)
					tooltip = ""

				var item = $(items.get(i))
				var selectorID = $(item).attr("id");
				var anchor = "notKnown!"
				if (selectorID)
					anchor = selectorID;
				else
				{
					var aID = $(item).find("a[id]");
					var A = $(item).find("a[name]");
					if (aID.length > 0)
						anchor = $(aID[0]).attr("id")
					else if (A.length > 0)
						anchor = $(A[0]).attr("name")
					else
					{
						if (autoAnchorBase == "")
						{
							autoAnchorBaseSearches++
							autoAnchorBase = getAutoAnchorBase()
							if (autoAnchorBase == "")
								autoAnchorFailures++
						}
						if (autoAnchorBase != "")
						{
							anchor = autoAnchorBase + "-" + (++autoAnchorsAdded)
							$(item).wrapInner("<a name='" + anchor + "'></a>")
						}
					}
				}
				var CSSclass = ""
				if (options.LIclassPrefix &&
				    $.trim(options.LIclassPrefix) != "" &&
				    tagName != "" )
					CSSclass = " class='" + options.LIclassPrefix + "-" + tagName + "'"

				// if this tag indent level higher than current
				//     slip in UL and note
				// elseif indenting and this tag lower than current
				//     remove indent

				if (options.debug) console.log("selectorID: " + selectorID + " on: " + $(item) + " anchor: " + anchor);
				TOChtml += "<li" + CSSclass + tooltip + "><a href='#" + anchor + "'>"
				         + item.text()
				         + "</a>\n";	// "</a></li>\n";
				rowsThisCol++
			}
			if (options.debug) console.log("End of Toc. indentLevel=" + indentLevel + " itemIndent=" + itemIndent);
			if (colEnd != '') {
				while (indentLevel-- > 0)
					colEnd += "</ul>";
				TOChtml += colEnd + colSuffix(col) + "</td><!-- LAST COL -->\n";
			}
			var info = ""
			if (options.addInfo || autoAnchorFailures > 0)
			{
				for (var i=0; i < indentSelectors.length; i++)
					info += (i > 0 ? "," : "") + indentSelectors[i];
				info = " title='Generated by autoTOC version " + version
				     + "\n items=" + items.length
				     + "\n indentSelectors: " + info
				     + "\n autoAnchorsAdded=" + autoAnchorsAdded 
				     + (autoAnchorFailures > 0 ? "\n autoAnchorFailures=" + autoAnchorFailures : "")
				     + "'"
			}
			if (options.debug) console.log("TOChtml:\n" + TOChtml);
			$(this).append("<table width='100%'" + info + "><tr>\n" + TOChtml + "</tr></table>\n")
		});

		function isColBreak(i, rowsThisCol)
		{
			tagName = items[i].tagName ? $.trim(items[i].tagName).toUpperCase() : ""
			var colBreak = rowsThisCol % rowsPerCol == 0
			if (!colBreak && ((i+1) < items.length) && options.avoidOrphans)
			{	// On last row of column. Check if we need to push this item to top of next one to prevent orphaning child.
				var nextTagName = items[i+1].tagName ? $.trim(items[i+1].tagName).toUpperCase() : ""
				var tags = options.selector.toUpperCase().split(',')
				for (var j=0; !colBreak && j < tags.length-1; j++)
				{
					var tag = $.trim(tags[j])
					var nextTag = $.trim(tags[j+1])
					if (tag == tagName && nextTag == nextTagName)
						colBreak = true
				}
			}

			return colBreak
		};

		function getAutoAnchorBase()
		{
			var bases = ["autoTOC", "AutoTOC", "_autoTOC"]
			for (var i in bases)
			{
				for (var n=0; n < 1000; n *= 10)
				{
					var N = "" + n
					if (n == 0)
					{
						n = 1
						N = ""
					}
					if ($("a[name^=" + bases[i] + N + "]").length < 1)
						return bases[i] + N
				}
			}
			return ""
		};

		function colSuffix(col)
		{
			if (col > 0 &&
			    options.colSuffixSections &&
			    options.colSuffixSections.length > 0)
			{
				var suffixIndex = cols - col;
				if (suffixIndex >= 0 &&
					suffixIndex < options.colSuffixSections.length &&
			        options.colSuffixSections[suffixIndex])
				{
					return "\n<!-- colSuffix(" + col + ") suffixIndex=" + suffixIndex + " -->\n" +
					       options.colSuffixSections[suffixIndex] +
					       "\n<!-- /colSuffix() -->\n";
				}
			}
			return ""
		};
	};
})(jQuery);