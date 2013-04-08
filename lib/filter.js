
exports.test = testFilter;

function testFilter(str, filters) {
	if(filters) {
		try {
			for (var i=0; i<filters.length; i++) {
				if (str.match(filters[i])){
					return true;
				}
			}
			return false;
		} catch(e) {	
			return false;
		}
	} else {
		return true;
	}
}
