/** @constructor */
function Util() {

}

/** 
 * Simple Conversion function for degrees to
 *  radians.
 *  @degrees {number}
 *  @return  {number}
 */
Util.degreesToRadians = function(degrees){
  return (degrees * Math.PI) / 180;
}

