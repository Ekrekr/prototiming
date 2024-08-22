import { create, toBinary } from "@bufbuild/protobuf";
import { SomeMessageSchema } from "./gen/theproto_pb.js";

const ITERATIONS = 1000;

const someMessage = create(SomeMessageSchema, {
  someString: "a".repeat((1 << 10) << 10),
});

const someMessageBytes = toBinary(SomeMessageSchema, someMessage);

console.log(
  `Measuring time to encode a ${someMessageBytes.length} byte message ${ITERATIONS} times...`
);
console.time("encode");

for (let i = 0; i < ITERATIONS; i++) {
  toBinary(SomeMessageSchema, someMessage);
}

console.timeEnd("encode");
