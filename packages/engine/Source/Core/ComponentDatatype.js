import defined from "./defined.js";
import DeveloperError from "./DeveloperError.js";
import WebGLConstants from "./WebGLConstants.js";

/**
 * WebGL component datatypes.  Components are intrinsics,
 * which form attributes, which form vertices.
 *
 * @enum {number}
 */
const ComponentDatatype = {
  /**
   * 8-bit signed byte corresponding to <code>gl.BYTE</code> and the type
   * of an element in <code>Int8Array</code>.
   *
   * @type {number}
   * @constant
   */
  BYTE: WebGLConstants.BYTE,

  /**
   * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
   * of an element in <code>Uint8Array</code>.
   *
   * @type {number}
   * @constant
   */
  UNSIGNED_BYTE: WebGLConstants.UNSIGNED_BYTE,

  /**
   * 16-bit signed short corresponding to <code>SHORT</code> and the type
   * of an element in <code>Int16Array</code>.
   *
   * @type {number}
   * @constant
   */
  SHORT: WebGLConstants.SHORT,

  /**
   * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
   * of an element in <code>Uint16Array</code>.
   *
   * @type {number}
   * @constant
   */
  UNSIGNED_SHORT: WebGLConstants.UNSIGNED_SHORT,

  /**
   * 32-bit signed int corresponding to <code>INT</code> and the type
   * of an element in <code>Int32Array</code>.
   *
   * @memberOf ComponentDatatype
   *
   * @type {number}
   * @constant
   */
  INT: WebGLConstants.INT,

  /**
   * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
   * of an element in <code>Uint32Array</code>.
   *
   * @memberOf ComponentDatatype
   *
   * @type {number}
   * @constant
   */
  UNSIGNED_INT: WebGLConstants.UNSIGNED_INT,

  /**
   * 32-bit floating-point corresponding to <code>FLOAT</code> and the type
   * of an element in <code>Float32Array</code>.
   *
   * @type {number}
   * @constant
   */
  FLOAT: WebGLConstants.FLOAT,

  /**
   * 64-bit floating-point corresponding to <code>gl.DOUBLE</code> (in Desktop OpenGL;
   * this is not supported in WebGL, and is emulated in Cesium via {@link GeometryPipeline.encodeAttribute})
   * and the type of an element in <code>Float64Array</code>.
   *
   * @memberOf ComponentDatatype
   *
   * @type {number}
   * @constant
   * @default 0x140A
   */
  DOUBLE: WebGLConstants.DOUBLE,
};

/**
 * Returns the size, in bytes, of the corresponding datatype.
 *
 * @param {ComponentDatatype} componentDatatype The component datatype to get the size of.
 * @returns {number} The size in bytes.
 *
 * @exception {DeveloperError} componentDatatype is not a valid value.
 *
 * @example
 * // Returns Int8Array.BYTES_PER_ELEMENT
 * const size = Cesium.ComponentDatatype.getSizeInBytes(Cesium.ComponentDatatype.BYTE);
 */
ComponentDatatype.getSizeInBytes = function (componentDatatype) {
  //>>includeStart('debug', pragmas.debug);
  if (!defined(componentDatatype)) {
    throw new DeveloperError("value is required.");
  }
  //>>includeEnd('debug');

  switch (componentDatatype) {
    case ComponentDatatype.BYTE:
      return Int8Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.UNSIGNED_BYTE:
      return Uint8Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.SHORT:
      return Int16Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.UNSIGNED_SHORT:
      return Uint16Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.INT:
      return Int32Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.UNSIGNED_INT:
      return Uint32Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.FLOAT:
      return Float32Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.DOUBLE:
      return Float64Array.BYTES_PER_ELEMENT;
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError("componentDatatype is not a valid value.");
    //>>includeEnd('debug');
  }
};

/**
 * Gets the {@link ComponentDatatype} for the provided TypedArray instance.
 *
 * @param {Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} array The typed array.
 * @returns {ComponentDatatype} The ComponentDatatype for the provided array, or undefined if the array is not a TypedArray.
 */
ComponentDatatype.fromTypedArray = function (array) {
  if (array instanceof Int8Array) {
    return ComponentDatatype.BYTE;
  }
  if (array instanceof Uint8Array) {
    return ComponentDatatype.UNSIGNED_BYTE;
  }
  if (array instanceof Int16Array) {
    return ComponentDatatype.SHORT;
  }
  if (array instanceof Uint16Array) {
    return ComponentDatatype.UNSIGNED_SHORT;
  }
  if (array instanceof Int32Array) {
    return ComponentDatatype.INT;
  }
  if (array instanceof Uint32Array) {
    return ComponentDatatype.UNSIGNED_INT;
  }
  if (array instanceof Float32Array) {
    return ComponentDatatype.FLOAT;
  }
  if (array instanceof Float64Array) {
    return ComponentDatatype.DOUBLE;
  }

  //>>includeStart('debug', pragmas.debug);
  throw new DeveloperError(
    "array must be an Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, or Float64Array.",
  );
  //>>includeEnd('debug');
};

/**
 * Validates that the provided component datatype is a valid {@link ComponentDatatype}
 *
 * @param {ComponentDatatype} componentDatatype The component datatype to validate.
 * @returns {boolean} <code>true</code> if the provided component datatype is a valid value; otherwise, <code>false</code>.
 *
 * @example
 * if (!Cesium.ComponentDatatype.validate(componentDatatype)) {
 *   throw new Cesium.DeveloperError('componentDatatype must be a valid value.');
 * }
 */
ComponentDatatype.validate = function (componentDatatype) {
  return (
    defined(componentDatatype) &&
    (componentDatatype === ComponentDatatype.BYTE ||
      componentDatatype === ComponentDatatype.UNSIGNED_BYTE ||
      componentDatatype === ComponentDatatype.SHORT ||
      componentDatatype === ComponentDatatype.UNSIGNED_SHORT ||
      componentDatatype === ComponentDatatype.INT ||
      componentDatatype === ComponentDatatype.UNSIGNED_INT ||
      componentDatatype === ComponentDatatype.FLOAT ||
      componentDatatype === ComponentDatatype.DOUBLE)
  );
};

/**
 * Creates a typed array corresponding to component data type.
 *
 * @param {ComponentDatatype} componentDatatype The component data type.
 * @param {number|Array} valuesOrLength The length of the array to create or an array.
 * @returns {Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} A typed array.
 *
 * @exception {DeveloperError} componentDatatype is not a valid value.
 *
 * @example
 * // creates a Float32Array with length of 100
 * const typedArray = Cesium.ComponentDatatype.createTypedArray(Cesium.ComponentDatatype.FLOAT, 100);
 */
ComponentDatatype.createTypedArray = function (
  componentDatatype,
  valuesOrLength,
) {
  //>>includeStart('debug', pragmas.debug);
  if (!defined(componentDatatype)) {
    throw new DeveloperError("componentDatatype is required.");
  }
  if (!defined(valuesOrLength)) {
    throw new DeveloperError("valuesOrLength is required.");
  }
  //>>includeEnd('debug');

  switch (componentDatatype) {
    case ComponentDatatype.BYTE:
      return new Int8Array(valuesOrLength);
    case ComponentDatatype.UNSIGNED_BYTE:
      return new Uint8Array(valuesOrLength);
    case ComponentDatatype.SHORT:
      return new Int16Array(valuesOrLength);
    case ComponentDatatype.UNSIGNED_SHORT:
      return new Uint16Array(valuesOrLength);
    case ComponentDatatype.INT:
      return new Int32Array(valuesOrLength);
    case ComponentDatatype.UNSIGNED_INT:
      return new Uint32Array(valuesOrLength);
    case ComponentDatatype.FLOAT:
      return new Float32Array(valuesOrLength);
    case ComponentDatatype.DOUBLE:
      return new Float64Array(valuesOrLength);
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError("componentDatatype is not a valid value.");
    //>>includeEnd('debug');
  }
};

/**
 * Creates a typed view of an array of bytes.
 *
 * @param {ComponentDatatype} componentDatatype The type of the view to create.
 * @param {ArrayBuffer} buffer The buffer storage to use for the view.
 * @param {number} [byteOffset] The offset, in bytes, to the first element in the view.
 * @param {number} [length] The number of elements in the view.
 * @returns {Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} A typed array view of the buffer.
 *
 * @exception {DeveloperError} componentDatatype is not a valid value.
 */
ComponentDatatype.createArrayBufferView = function (
  componentDatatype,
  buffer,
  byteOffset,
  length,
) {
  //>>includeStart('debug', pragmas.debug);
  if (!defined(componentDatatype)) {
    throw new DeveloperError("componentDatatype is required.");
  }
  if (!defined(buffer)) {
    throw new DeveloperError("buffer is required.");
  }
  //>>includeEnd('debug');

  byteOffset = byteOffset ?? 0;
  length =
    length ??
    (buffer.byteLength - byteOffset) /
      ComponentDatatype.getSizeInBytes(componentDatatype);

  switch (componentDatatype) {
    case ComponentDatatype.BYTE:
      return new Int8Array(buffer, byteOffset, length);
    case ComponentDatatype.UNSIGNED_BYTE:
      return new Uint8Array(buffer, byteOffset, length);
    case ComponentDatatype.SHORT:
      return new Int16Array(buffer, byteOffset, length);
    case ComponentDatatype.UNSIGNED_SHORT:
      return new Uint16Array(buffer, byteOffset, length);
    case ComponentDatatype.INT:
      return new Int32Array(buffer, byteOffset, length);
    case ComponentDatatype.UNSIGNED_INT:
      return new Uint32Array(buffer, byteOffset, length);
    case ComponentDatatype.FLOAT:
      return new Float32Array(buffer, byteOffset, length);
    case ComponentDatatype.DOUBLE:
      return new Float64Array(buffer, byteOffset, length);
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError("componentDatatype is not a valid value.");
    //>>includeEnd('debug');
  }
};

/**
 * Get the ComponentDatatype from its name.
 *
 * @param {string} name The name of the ComponentDatatype.
 * @returns {ComponentDatatype} The ComponentDatatype.
 *
 * @exception {DeveloperError} name is not a valid value.
 */
ComponentDatatype.fromName = function (name) {
  switch (name) {
    case "BYTE":
      return ComponentDatatype.BYTE;
    case "UNSIGNED_BYTE":
      return ComponentDatatype.UNSIGNED_BYTE;
    case "SHORT":
      return ComponentDatatype.SHORT;
    case "UNSIGNED_SHORT":
      return ComponentDatatype.UNSIGNED_SHORT;
    case "INT":
      return ComponentDatatype.INT;
    case "UNSIGNED_INT":
      return ComponentDatatype.UNSIGNED_INT;
    case "FLOAT":
      return ComponentDatatype.FLOAT;
    case "DOUBLE":
      return ComponentDatatype.DOUBLE;
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError("name is not a valid value.");
    //>>includeEnd('debug');
  }
};
export default Object.freeze(ComponentDatatype);
