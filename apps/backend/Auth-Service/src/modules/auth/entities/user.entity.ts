import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Genre, MfaMethod, PersonnelType, UserStatus } from "./auth.enum";
import { UserRole } from "./userRole.entity";
import { RefreshToken } from "./refreshToken.entity";

/**
 * Entité User (compte du personnel hospitalier)
 *
 * Représente le compte de connexion d'un agent : médecin, infirmier,
 * agent d'admission, secrétaire médicale, administrateur, etc.
 * C'est l'identité "employé" du SIH — à ne pas confondre avec le Patient
 * (Patient-Identity-Service), qui est l'identité "soigné".
 *
 * Les autres microservices référencent un agent via `user.id` (uuid) ou
 * `matricule` — c'est ce qu'on enregistre dans les colonnes createdBy /
 * updatedBy / personnel_id des dossiers patient et admission.
 */
@Entity("users")
export class User {

    // Identifiant technique interne (clé primaire)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    // Matricule / identifiant RH métier, unique, utilisé au quotidien
    @Index()
    @Column({ length: 255, type: "varchar", unique: true, nullable: false })
    matricule!: string;

    // ===== Identité civile =====
    @Index()
    @Column({ length: 255, type: "varchar" })
    nom!: string;

    @Index()
    @Column({ length: 255, type: "varchar" })
    prenom!: string;

    @Column({ type: "enum", enum: Genre, nullable: true })
    genre?: Genre;

    // ===== Identifiants de connexion =====

    // Email professionnel : sert d'identifiant de connexion principal
    @Index()
    @Column({ length: 255, type: "varchar", unique: true, nullable: false })
    email!: string;

    @Index()
    @Column({ length: 255, type: "varchar", nullable: true })
    telephone?: string;

    // Empreinte bcrypt/argon2 du mot de passe. JAMAIS le mot de passe en clair.
    // `select: false` : la colonne n'est pas remontée par défaut dans les SELECT.
    @Column({ length: 255, type: "varchar", nullable: true, select: false })
    passwordHash?: string;

    // Date du dernier changement de mot de passe (politique d'expiration)
    @Column({ type: "timestamp", nullable: true })
    passwordChangedAt?: Date;

    // Force l'utilisateur à changer son mot de passe à la prochaine connexion
    @Column({ type: "boolean", default: false })
    mustChangePassword!: boolean;

    // ===== Profil métier =====
    @Index()
    @Column({ type: "enum", enum: PersonnelType, default: PersonnelType.AUTRE })
    personnelType!: PersonnelType;

    // Spécialité (pour les médecins) : cardiologie, pédiatrie...
    @Column({ length: 255, type: "varchar", nullable: true })
    specialite?: string;

    // Numéro d'ordre / RPPS / ADELI du praticien
    @Index()
    @Column({ length: 255, type: "varchar", unique: true, nullable: true })
    numeroOrdre?: string;

    // Service / département d'affectation (ex: URGENCES, CARDIOLOGIE, ADMISSION)
    @Index()
    @Column({ length: 255, type: "varchar", nullable: true })
    serviceAffectation?: string;

    // ===== Statut & sécurité du compte =====
    @Index()
    @Column({ type: "enum", enum: UserStatus, default: UserStatus.EN_ATTENTE_ACTIVATION })
    status!: UserStatus;

    // Compteur d'échecs de connexion consécutifs (remis à 0 après un succès)
    @Column({ type: "integer", default: 0 })
    failedLoginAttempts!: number;

    // Date jusqu'à laquelle le compte est verrouillé automatiquement
    @Column({ type: "timestamp", nullable: true })
    lockedUntil?: Date;

    // Date/IP de la dernière connexion réussie
    @Column({ type: "timestamp", nullable: true })
    lastLoginAt?: Date;

    @Column({ length: 255, type: "varchar", nullable: true })
    lastLoginIp?: string;

    // ===== Double authentification (MFA) =====
    @Column({ type: "boolean", default: false })
    mfaEnabled!: boolean;

    @Column({ type: "enum", enum: MfaMethod, default: MfaMethod.NONE })
    mfaMethod!: MfaMethod;

    // Secret TOTP chiffré. Non sélectionné par défaut et exclu des snapshots.
    @Column({ length: 255, type: "varchar", nullable: true, select: false })
    mfaSecret?: string;

    // ===== Authentification Rapide par Code PIN (6 chiffres) =====
    @Column({ type: "boolean", default: false })
    pinEnabled!: boolean;

    // Empreinte bcrypt/argon2 du code PIN 6 chiffres (JAMAIS en clair).
    // `select: false` : exclu des requêtes SELECT par défaut.
    @Column({ length: 255, type: "varchar", nullable: true, select: false })
    pinHash?: string;

    // Compteur d'échecs de saisie du PIN (sécurité anti-brute force)
    @Column({ type: "integer", default: 0 })
    failedPinAttempts!: number;

    // Date de verrouillage temporaire du PIN (ex: bloqué 15 min après 5 tentatives échouées)
    @Column({ type: "timestamp", nullable: true })
    pinLockedUntil?: Date;

    // ===== Relations RBAC / sessions =====
    @OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles?: UserRole[];

    @OneToMany(() => RefreshToken, (token) => token.user)
    refreshTokens?: RefreshToken[];

    @OneToMany("UserDocument", "user")
    documents?: any[];

    // ===== Métadonnées système =====
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Compte administrateur ayant créé cet utilisateur
    @Column({ length: 255, type: "varchar", nullable: true })
    createdBy?: string;

    @Column({ length: 255, type: "varchar", nullable: true })
    updatedBy?: string;

    // Suppression douce : un compte n'est jamais supprimé physiquement.
    @DeleteDateColumn()
    deletedAt?: Date;

    @Column({ length: 255, type: "varchar", nullable: true })
    deletedBy?: string;
}
