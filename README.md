# Issue Tracker

GitHub repository의 issue 발행 기능을 모티브 삼아 issue를 만들고 마일스톤으로 관리할 수 있는 application의 Backend 개발에 참여하였으며, Frontend(React)와 협업을 수행하였습니다.

### 주요 역할

- Backend API 전체 개발 및 Spring REST docs를 활용한 API 문서 배포
- AWS 환경 배포 및 Nginx reverse proxy를 활용한 애플리케이션 운영 환경 구축

### 목차

- [Project Structure](#project-structure)
- [주요 의사 결정](#주요-의사-결정)
- [프로젝트를 통해 배운 점](#프로젝트를-통해-배운-점)

<br>

## Project Structure

### Skills
- Spring Boot (API Server)
- Spring REST Docs (API Docs)
- MySQL (DB)
- JPA & Querydsl(ORM)
- OAuth 2.0 + JWT (Login)
- AWS Elasticache - Redis (Cache)
- JUnit5 (Test)
- AWS EC2, S3, RDS (Infra)
- Nginx (Reverse Proxy + Load balancing)
- GitHub action & CodeDeploy (CI/CD)

### ERD

<img width="700" alt="image" src="https://user-images.githubusercontent.com/62360009/187634117-4d54e1ec-b030-42b8-af0d-0974dbcbf2e5.png">

### API Documentation

[API 문서 링크](https://refined-github-html-preview.kidonng.workers.dev/mina-gwak/issue-tracker/raw/deploy-test/BE/src/main/resources/static/docs/index.html)

<br>

## 주요 의사 결정

### 1. 쉬운 API 문서화를 위한 RestDocs 적용

> **문제 정의**

기존에는 API 문서화를 위해서 Postman에서 제공하는 Documentation 기능을 사용했지만 클라이언트의 요구사항 변경이 빈번한 상황에서 매번 다른 플랫폼을 통해 문서를 수정하고 재배포하는 과정이 번거로웠습니다. 

<br>

> **해결**

Spring REST Docs를 적용하였습니다. RestController에 대한 단위 테스트를 의무적으로 작성해야 하는 장점이 생김과 동시에 API 문서를 static으로 생성해 주어 빌드 시 자동으로 업데이트되는 장점이 있었고, 이를 통해 문서작성보다 구현에 더 집중할 수 있게 되었습니다.

<br>

### 2. 동적쿼리 생성을 위한 Querydsl 적용

> **문제 정의**

issue에는 라벨, 마일스톤, assignee 등 추가 정보가 붙게 되며 해당 정보를 통해 issue List 조회 시 filtering을 할 수 있도록 기능을 구현하였습니다. 이 과정에서 Database에 Query를 보낼 때 filter의 유무에 따라 동적으로 쿼리에 where 절 반영이 필요했습니다.

<br>

> **해결**

Querydsl을 활용하여 filter의 유무에 따라 where 절을 동적으로 생성할 수 있었습니다. 그 외에도 fetchJoin, 페이징 처리 등을 직관적으로 작성할 수 있어 복잡한 쿼리를 유지 보수하기 쉽게 구현할 수 있었습니다.

<br>

### 3. N:M 매핑 이슈

> **문제 정의 1 : FK 참조 무결성 문제**

아래와 같이 Issue와 Label 간 N:M 관계를 중간 테이블인 AttachedLabel을 통해 풀어냈습니다. 이 과정에서 AttachedLabel에 Foreign key 제약조건으로 인해 Issue 또는 Label을 삭제하려면 우선 중간 테이블인 AttachedLabel을 제거해야 하는 상황이 발생했습니다.

<img width="614" alt="image" src="https://user-images.githubusercontent.com/62360009/187634601-cd71cb03-f482-4da7-90bc-157f0225c5cf.png">

<br>

> **해결 1 : 제약조건 제거**

우선 Issue Entity에서는 조회의 용이성을 위해 AttachedLabel을 Collection으로 참조하고 있으며, @OneToMany의 cascade 옵션으로 life cycle을 함께 가져가도록 적용하였습니다. 그리고 Label에 대한 Foreign key 제약 조건을 AttachedLabel 테이블에서 제거함으로써 1차적인 문제는 해결하였습니다.

<br>
<br>

> **문제 정의 2 : EntityNotFoundException**

하지만 이로 인해 AttachedLabel에서는 Label에 대한 참조 무결성을 어기게 되며, 실제로 Label Lazy Loading 되는 시점에 EntityNotFoundException이 발생하였습니다. 

<br>

> **해결 2 : Exception Handling으로 해결**

다음 두 가지 방법으로 해결 방안을 고려하였습니다.

- AttachedLabel 내의 Label Field에 @NotFound을 적용(하이버네이트 제공)
    - 실제 테이블에 FK에 해당하는 id가 없을 경우 null로 초기화를 시켜줍니다.
    - 하지만 EAGER Loading으로 강제로 초기화되는 단점이 있습니다.
- EntityNotFoundException Handling
    - Lazy Loading 시점에 EntityNotFoundException을 catch해서 해당 엔티티를 null로 직접 초기화하는 방식입니다.

@NotFound 어노테이션이 주는 편리함이 있었지만 라벨 1000건 조회 기준으로 시간 측정 결과 두 방식에 차이가 거의 없었습니다.(1000건 기준 둘 다 400ms) 따라서 기존 Lazy Loading 전략을 그대로 가져갈 수 있도록 예외를 Handling 하는 방식으로 문제를 해결하였습니다. 

<br>

### 4. 자주 요청되는 데이터에 Redis caching 적용

> **문제 정의**

issue 리스트 내에 존재하는 단건 issue에 대해 마우스 커서를 올리게 되면 pop-up으로 issue에 대한 간략 정보를 확인할 수 있는 API를 구현하였습니다. 사용자 입장에서는 커서를 움직일 일이 빈번하기 때문에 의도/비의도적으로 해당 API를 호출할 일이 많을 것으로 예상하였습니다.

<br>

> **해결**

해당 로직에 redis caching을 적용하였습니다. 이를 통해 response time을 약 15배(1463ms → 96ms) 개선할 수 있었으며 issue update 발생 시 로직에 cacheEvict를 활용하여 캐시 정합성을 유지하였습니다.

<br>

### 5. Redis rollback 적용

> **문제 정의**

OAuth login 후 JWT Refresh token을 Redis에서 관리하도록 하였는데, 로그인 과정에서 예외가 발생할 경우에도 Server에서 만든 JWT token이 Redis에 저장되어 있는 문제가 발생하였습니다. 흐름 상 예외가 발생할 여지는 없었지만 그럼에도 예외 발생 시 의미가 없어지는 Token을 저장하는 것은 문제가 된다고 판단하였습니다. 

<br>

> **해결**

Spring에서는 기본적으로 Redis를 위한 PlatformTransactionManager를 제공해 주지 않습니다. 따라서 기존에 등록된 JpaTransactionManager가 관리하는 Connection을 통해 @Transactional 기능을 활용할 수 있도록 아래와 enableTransactionSupport를 true로 활성화시켜 rollback을 구현할 수 있었습니다.

```java
@Bean
public StringRedisTemplate redisTemplate() {
    StringRedisTemplate template = new StringRedisTemplate(redisConnectionFactory());
    template.setEnableTransactionSupport(true);
    return template;
}
```

<br>

### 6. 부하 테스트를 통한 쿼리 최적화

> **문제 정의**

앞서 동적 쿼리를 손쉽게 생성할 수 있는 Querydsl을 적용하여 필터링 기능을 구현할 수 있었습니다. 하지만 조건 필터링을 위해 매번 다수의 테이블을 JOIN 하는 과정이 Database에 부담을 줄 것으로 생각되었으며, 메인 화면에 진입과 동시에 항상 호출되는 API이기 때문에 최적화가 필요하다고 판단하였습니다. 

이를 확인하기 위해 nGlinder를 활용하여 부하 테스트를 진행하였으며 385 TPS(Vuser : 100, Run Time : 2min)의 성능을 확인하였으며 Thread dump 확인 시 socketRead 상태에서 대기하는 Thread들을 발견하였고 해당 지점을 튜닝 포인트로 정의하여 최적화를 진행하였습니다.

성능 저하 원인으로 다음 두 가지를 정의하였으며, 개선하기 위한 목표로 잡았습니다.

1. 페이징 처리를 위해 중복된 condition(JOIN, WHERE)을 갖는 전체 count 조회 쿼리 개선 필요
2. 불필요한 Column도 함께 조회되는 쿼리 개선 필요

<br>

> **1차 변경 (최초 대비 12% 성능 개선) : 중복된 Condition을 갖는 Count Query 제거**

페이징 처리를 위해서는 조건에 해당하는 이슈 전체 개수도 함께 조회되어야 하는 쿼리가 추가로 필요하며, 이를 활용할 수 있는 서브 쿼리 형태를 고려하였습니다. SELECT 절에서 조건에 해당하는 id 전체를 조회하고 결과 List의 Size를 통해 전체 사이즈를 계산할 수 있도록 변경하였습니다. 이렇게 조회된 id를 WHERE IN 절에 넣어 나머지 필요한 Column을 조회하는 방식으로 변경하였습니다. 이를 통해 실질적으로 Entity 조회를 하는 쿼리에는 JOIN, WHERE 절이 사라져 코드 중복이 제거되었고 435 TPS(최초 대비 12% 개선)의 성능을 확인하였습니다.

> **2차 변경 (최초 대비 25% 성능 개선) : 불필요한 Column 조회를 제거하기 위해 DTO mapping으로 변경**

앞서 1차 변경의 결과도 마찬가지로 Entity 조회를 적용했기 때문에 최종적으로 Client로 반환되는 결과에 불필요한 Column이 조회되는 문제가 발생합니다. 만약 필요한 Column만을 조회하는 DTO로 변경된다면 더 이상 연관관계를 활용할 수 없기 때문에 기존에 이슈 Entity와 1:N 관계를 맺고 Lazy Loading으로 조회되던 Entity를 조회할 수 없게 됩니다. 이를 해결하기 위해 결과 row를 특정 Column으로 Grouping 하는 transform 기능을 활용하였고 DTO에 해당하는 Column들을 추출함과 동시에 Collection을 생성할 수 있어 앞서 발생한 문제를 해결할 수 있었습니다. 또한 Lazy Loading 없이 Collection에 해당하는 모든 Column을 한꺼번에 조회했기 때문에 1번의 쿼리로 최적화할 수 있게 되었습니다. 결과로 485 TPS(최초 대비 25% 개선)의 성능을 확인하였습니다.

> **3차 변경 (최초 대비 430% 성능 개선) : Redis Caching 적용**

추가로 Redis Cache를 적용하여 성능을 개선하였습니다. 필터링 대상인 query string을 key로 적용하여 결과를 Caching 하였고 정합성을 위해 TTL을 5초로 설정하였습니다. 결과로 2035 TPS(최초 대비 430% 개선)의 성능을 확인하였습니다.

<br>

### 7. Sentry logging 적용

> **문제 정의**

기존에는 배포 후 클라이언트에서 디버깅 요청이 올 때마다 직접 AWS EC2 환경에 접속해서 서버 로그를 체크하는 방식으로 처리하는 번거로움이 있었으며, vim을 통해 체크해야 하기 때문에 실질적으로 로그를 통한 에러 추적이 어려웠습니다.

<br>

> **해결**

간단한 yml 설정을 통해 로그를 시각적으로 확인할 수 있는 Sentry를 도입하게 되었습니다. 의도한 예외일 경우 로직에서 RuntimeException을 custom으로 정의하여 throw 하였고, GlobalExceptionHandler를 통해 해당 예외에 대한 trace를 분석하여 의미 있는 로그를 남긴 후 클라이언트에서 상황을 쉽게 인지할 수 있는 Response를 전달하였습니다. 예상하지 못한 예외(internal Server Exception 등)일 경우에도 마찬가지로 로그를 남겨 문제를 파악하였고 아래와 같이 Sentry에 접속하여 배포된 서버에서 발생한 로그를 쉽게 체크할 수 있었습니다. 이를 통해 디버깅 시간을 줄일 수 있었습니다.

<img width="1367" alt="image" src="https://user-images.githubusercontent.com/62360009/187634908-cc6a6780-affa-4122-80a7-79d6fe5bed4a.png">

<br>

### 8. 무중단 Rolling 배포 적용

> **문제 정의**

Nginx의 로드밸런싱 기능을 활용하여 하나의 EC2 내에 2대의 애플리케이션을 생성하여 요청 트래픽 분산을 시도하였습니다. 이 과정에서 코드 수정 발생 시 서버 2대에 모두 코드가 반영되어야 하는 상황이 필요했는데 Nginx configuration의 proxy 설정에 Round robin 방식 로드밸런싱을 적용하였기 때문에 한 쪽 서버의 health check가 덜 된 상황에서도 요청을 보내게 되어 miss 되는 현상이 발생하였습니다. 

<br>

> **해결** 

애플리케이션을 하나씩 수정된 코드로 업데이트하는 Rolling 배포 전략을 사용하였습니다. nginx.conf에서 참조하는 upstream.conf 파일을 codeDeploy 실행 스크립트에서 동적으로 수정하는 방식으로 proxy 설정을 변경하였고, 이를 통해 무중단 배포를 구현하였습니다.

<img width="1360" alt="image" src="https://user-images.githubusercontent.com/62360009/187635036-2827dddb-bf13-4348-abca-63bb0570a43c.png">

<br>

## 프로젝트를 통해 배운 점

- 문제 해결을 위해 처음부터 Cache를 사용했다면 빠르게 성능을 개선할 수 있었겠지만, 부하 테스트를 통해 애플리케이션의 실제 병목지점을 파악하고 쿼리 개선을 통해 조금이나마 성능을 향상시킬 수 있는 방법을 고민할 수 있었던 경험이 되었습니다. 또한 어떤 애플리케이션을 개발하든 성능 측정을 통한 최적화 과정은 필수임을 알게 되었습니다.
- 문제 정의와 여러 번의 개선 과정을 통해 인내심을 기를 수 있었으며 문제 접근 능력을 향상시키기 위한 기본기와 직접 부딪혀가며 습득하는 경험의 중요성을 알게 되었습니다. 
