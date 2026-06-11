import {NodeSDK} from "@opentelemetry/sdk-node"
import {OTLPTraceExporter} from "@opentelemetry/exporter-trace-otlp-proto" 
import {getNodeAutoInstrumentations} from "@opentelemetry/auto-instrumentations-node"


export const initTracing = (serviceName : string) => {

    const sdk = new NodeSDK({
        serviceName : serviceName,
        traceExporter : new OTLPTraceExporter({
            url : "http://localhost:4318/v1/traces"
        }),
        instrumentations : [getNodeAutoInstrumentations()]
    })

    sdk.start();
    console.log("Tracing running ",serviceName)

    process.on('SIGTERM', ()=> {
        sdk.shutdown().finally(() => process.exit(0))
    })
}