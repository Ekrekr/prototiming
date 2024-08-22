import * as path from "path";
import * as pbjs from "protobufjs";

const ITERATIONS = 1000;

const protoPath = path.join(__dirname, "../../protos/theproto.proto");

const rootProto: any = pbjs.loadSync(protoPath);
if (!rootProto) {
  throw new Error(`Could not find proto at ${protoPath}`);
}
const theproto = rootProto.nested.theproto.nested;

const someMessage = theproto.SomeMessage.create({
  someString: "a".repeat((1 << 10) << 10),
});

const encodedSomeMessage = theproto.SomeMessage.encode(someMessage).finish();

console.log(
  `Measuring time to encode a ${encodedSomeMessage.length} byte compiled graph ${ITERATIONS} times...`
);
console.time("encode");

for (let i = 0; i < ITERATIONS; i++) {
  theproto.SomeMessage.encode(someMessage).finish();
}

console.timeEnd("encode");
